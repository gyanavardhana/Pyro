const User = require('../Models/userModel');
const cons = require('../cons');
const logger = require('../logger/logger');
const jwt = require('jsonwebtoken');

// Function to validate token
const validatetoken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userid;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

// Function to add product to favorites
const addToFavorites = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const userid = validatetoken(token);
    if (!userid) {
        return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
    }

    const { productId } = req.body;

    try {
        await User.findByIdAndUpdate(userid, { $addToSet: { favourites: productId } });
        res.status(cons.ok).json({ message: 'Product added to favorites' });
    } catch (error) {
        logger.error(error);
        res.status(cons.internalerror).json({ message: 'Server error' });
    }
};

// Function to remove product from favorites
const removeFromFavorites = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const userid = validatetoken(token);
    if (!userid) {
        return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
    }

    const { productId } = req.body;

    try {
        await User.findByIdAndUpdate(userid, { $pull: { favourites: productId } });
        res.status(cons.ok).json({ message: 'Product removed from favorites' });
    } catch (error) {
        logger.error(error);
        res.status(cons.internalerror).json({ message: 'Server error' });
    }
};

module.exports = {
    addToFavorites,
    removeFromFavorites
};
