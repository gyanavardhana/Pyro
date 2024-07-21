const Product = require('../Models/productModel');
const User = require('../Models/userModel');
const cons = require('../cons');
const logger = require('../logger/logger');
const jwt = require('jsonwebtoken');

// Utility function to validate JWT token
const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userid;
    } catch (error) {
        logger.error('Token validation failed:', error);
        return null;
    }
};

// Utility function to format product data with predictions
const formatProductData = (products) => {
    return products.map(product => ({
        name: product.name,
        Type: product.Type,
        Airtemperature: product.Airtemperature,
        Processtemperature: product.Processtemperature,
        Rotationalspeed: product.Rotationalspeed,
        Torque: product.Torque,
        Toolwear: product.Toolwear,
        count: product.count,
        userid: product.userid,
        prediction: product.outputid ? product.outputid.prediction : null,
        probability_maintenance_needed: product.outputid ? product.outputid.probability_maintenance_needed : null,
        probability_no_maintenance: product.outputid ? product.outputid.probability_no_maintenance : null
    }));
};

// Controller function to get product data for a user
const getData = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
        }

        const userid = validateToken(token);
        if (!userid) {
            return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
        }

        // Retrieve and populate products with their output data
        const products = await Product.find({ userid }).populate('outputid');
        const productsWithPredictions = formatProductData(products);

        res.status(cons.ok).json({ products: productsWithPredictions });
    } catch (error) {
        logger.error('Error retrieving product data:', error);
        res.status(cons.internalerror).json({ message: 'Server error' });
    }
};

// Controller function to get favorite products for a user
const getFavorites = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
        }

        const userid = validateToken(token);
        if (!userid) {
            return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
        }

        // Retrieve user's favorites from User model
        const user = await User.findById(userid).populate('favourites');
        if (!user) {
            return res.status(cons.notfound).json({ message: 'User not found' });
        }

        const favoriteProductIds = user.favourites.map(fav => fav._id);

        // Retrieve and populate favorite products
        const products = await Product.find({ _id: { $in: favoriteProductIds } }).populate('outputid');
        const productsWithPredictions = formatProductData(products);

        res.status(cons.ok).json({ products: productsWithPredictions });
    } catch (error) {
        logger.error('Error retrieving favorite products:', error);
        res.status(cons.internalerror).json({ message: 'Server error' });
    }
};

module.exports = {
    getData,
    getFavorites,
};
