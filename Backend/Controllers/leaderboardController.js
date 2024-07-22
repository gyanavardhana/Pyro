const Product = require('../Models/productModel');
const ProductOutput = require('../Models/prodoutputModel');
const User = require('../Models/userModel');
const cons = require('../cons');
const logger = require('../logger/logger');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../Controllers/emailService'); // Import the email service


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
                    from: 'products',
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
                        $in: ['$product._id', favouriteProductIds]
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
                    isFavourite: { $first: '$isFavourite' }
                }
            },
            {
                $addFields: {
                    rankScore: {
                        $add: [
                            { $multiply: ['$ratio', 0.5] },
                            { $multiply: ['$riskPercentage', 0.3] },
                            { $multiply: ['$averageRiskScore', 0.2] }
                        ]
                    }
                }
            },
            {
                $sort: { rankScore: -1 }
            },
            {
                $setWindowFields: {
                    sortBy: { rankScore: 1 },
                    output: {
                        rank: { $rank: {} }
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
                    rank: 1,
                    isFavourite: 1
                }
            }
        ]);

        // Email notification for products below the threshold ratio
        const ratioThreshold = 0.5; // Define your threshold ratio here
        const lowRatioProducts = leaderboard.filter(product => product.ratio > ratioThreshold);

        if (lowRatioProducts.length > 0) {
            const subject = 'Products Below Desired Ratio';
            const htmlContent = `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            padding: 20px;
                        }
                        h1 {
                            color: #e74c3c;
                            font-size: 24px;
                        }
                        .alert-icon {
                            width: 40px;
                            height: 40px;
                            vertical-align: middle;
                        }
                        ul {
                            padding-left: 20px;
                        }
                        li {
                            margin-bottom: 10px;
                        }
                        .footer {
                            margin-top: 20px;
                            font-size: 14px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <h1><img src="http://localhost:5173/src/assets/alert-icon.png" class="alert-icon" alt="Alert Icon" /> Alert: Products Below Desired Ratio</h1>
                    <p>The following products are below the desired ratio threshold of ${ratioThreshold}:</p>
                    <ul>
                        ${lowRatioProducts.map(product => `
                            <li>
                                <strong>${product.name}</strong>: Ratio ${product.ratio}
                            </li>
                        `).join('')}
                    </ul>
                    <p class="footer">Consider reviewing these products to mitigate potential risks.</p>
                </body>
                </html>
            `;
            const userEmail = user.email; // Assuming user email is stored in the User model
            await sendEmail(userEmail, subject, htmlContent);
        }

        res.json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getLeaderboard
};
