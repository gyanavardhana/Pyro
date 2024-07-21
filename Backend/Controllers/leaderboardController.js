const Product = require('../Models/productModel');
const ProductOutput = require('../Models/prodoutputModel');
const User = require('../Models/userModel');
const cons = require('../cons');
const logger = require('../logger/logger');
const jwt = require('jsonwebtoken');

// Helper function to validate JWT token
const validatetoken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userid;
    } catch (error) {
        logger.error('Token validation failed:', error);
        return null;
    }
};

const getLeaderboard = async (req, res) => {
    try {
        // Validate token
        if (!req.headers.authorization) {
            return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
        }
        const token = req.headers.authorization.split(' ')[1];
        const userid = validatetoken(token);

        if (!userid) {
            return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
        }

        // Fetch user's favourite products
        const user = await User.findById(userid).populate('favourites');
        const favouriteProductIds = user.favourites.map(product => product._id);

        // Aggregation pipeline
        const leaderboard = await ProductOutput.aggregate([
            {
                $lookup: {
                    from: 'products', // Ensure this matches the actual collection name
                    localField: 'productid',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $project: {
                    product: 1,
                    probability_maintenance_needed: 1,
                    probability_no_maintenance: 1,
                    averageRiskScore: {
                        $divide: ['$probability_maintenance_needed', '$product.count']
                    },
                    ratio: {
                        $cond: {
                            if: { $eq: ['$probability_no_maintenance', 0] },
                            then: '$probability_maintenance_needed',
                            else: { $divide: ['$probability_maintenance_needed', '$probability_no_maintenance'] }
                        }
                    },
                    riskPercentage: {
                        $multiply: [
                            { $divide: ['$probability_maintenance_needed', { $add: ['$probability_maintenance_needed', '$probability_no_maintenance'] }] },
                            100
                        ]
                    },
                    isFavourite: {
                        $in: ['$product._id', favouriteProductIds] // Check if product is a favourite
                    }
                }
            },
            {
                $group: {
                    _id: '$product._id',
                    name: { $first: '$product.name' },
                    averageRiskScore: { $avg: '$averageRiskScore' },
                    ratio: { $avg: '$ratio' },
                    riskPercentage: { $avg: '$riskPercentage' },
                    isFavourite: { $first: '$isFavourite' } // Keep track of favourite status
                }
            },
            {
                $addFields: {
                    rankScore: {
                        $add: [
                            { $multiply: ['$ratio', 0.5] }, // Adjust weight as needed
                            { $multiply: ['$riskPercentage', 0.3] }, // Adjust weight as needed
                            { $multiply: ['$averageRiskScore', 0.2] }  // Adjust weight as needed
                        ]
                    }
                }
            },
            {
                $sort: { rankScore: -1 } // Sort by rankScore in descending order
            },
            {
                $setWindowFields: {
                    sortBy: { rankScore: -1 }, // Sort by rankScore
                    output: {
                        rank: { $rank: {} } // Assign ranks based on sorted order
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    averageRiskScore: 1,
                    ratio: 1,
                    riskPercentage: 1,
                    rank: 1, // Include rank in the final output
                    isFavourite: 1 // Include favourite status in the final output
                }
            }
        ]);

        res.json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getLeaderboard
};


