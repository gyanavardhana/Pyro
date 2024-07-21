const Product = require('../Models/productModel');
const ProductOutput = require('../Models/prodoutputModel');
const User = require('../Models/userModel');
const cons = require('../cons');
const logger = require('../logger/logger');
const jwt = require('jsonwebtoken');
const axios = require('axios');

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

// Helper function to call the external API and create ProductOutput
const postProductOutput = async (Type, Airtemperature, Processtemperature, Rotationalspeed, Torque, Toolwear, productId) => {
    try {
        const response = await axios.post('http://localhost:5000/predict', {
            "Type": Type,
            "Air Temperature": Airtemperature,
            "Process Temperature": Processtemperature,
            "Rotational Speed": Rotationalspeed,
            "Torque": Torque,
            "Tool wear": Toolwear
        });

        const { prediction, probability_maintenance_needed, probability_no_maintenance } = response.data;

        const newProductOutput = new ProductOutput({
            prediction,
            probability_maintenance_needed,
            probability_no_maintenance,
            productid: productId
        });

        const savedProductOutput = await newProductOutput.save();

        return { outputid: savedProductOutput._id, prediction, probability_maintenance_needed, probability_no_maintenance };
    } catch (error) {
        logger.error('Error while posting product output:', error);
        throw new Error('Server error');
    }
};

// Controller function to create a product and its output
const createProduct = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const userid = validatetoken(token);

    if (!userid) {
        return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
    }

    const { name, Type, Airtemperature, Processtemperature, Rotationalspeed, Torque, Toolwear } = req.body;

    try {
        const newProduct = new Product({
            name,
            Type,
            Airtemperature,
            Processtemperature,
            Rotationalspeed,
            Torque,
            Toolwear,
            userid,
        });

        const savedProduct = await newProduct.save();

        await User.findByIdAndUpdate(userid, { $push: { products: savedProduct._id } });

        const { outputid, prediction, probability_maintenance_needed, probability_no_maintenance } = await postProductOutput(
            Type, Airtemperature, Processtemperature, Rotationalspeed, Torque, Toolwear, savedProduct._id
        );

        await Product.findByIdAndUpdate(savedProduct._id, { outputid: outputid });

        res.status(cons.created).json({
            product: savedProduct,
            prediction: { prediction, probability_maintenance_needed, probability_no_maintenance }
        });
    } catch (error) {
        logger.error('Error while creating product:', error);
        res.status(cons.internalerror).json({ message: 'Server error' });
    }
};

module.exports = {
    createProduct,
};
