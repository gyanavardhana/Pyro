// Imports
const express = require('express');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const mongoose = require('mongoose');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');
const logger = require('../logger/logger');
const jwt = require('jsonwebtoken');
const cons = require('../cons');

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

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyC_kRaTa9ECDAEcJxP8C1w7oh5UBe1y3Y8"; // Update with your API key
const PREDICT_API_URL = "https://flask-predict-1p0e.onrender.com/predict";
const PLOT_API_URL = "https://flask-predict-1p0e.onrender.com/plot";

const generatePdfController = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
        }
        const token = req.headers.authorization.split(' ')[1];
        const userid = validatetoken(token);

        if (!userid) {
            return res.status(cons.unauthorized).json({ message: 'Invalid or expired token' });
        }

        // Fetch user information
        const user = await User.findById(userid).populate('products');
        if (!user || user.products.length === 0) {
            return res.status(404).json({ message: 'No products found for this user' });
        }

        // Get the most recent product
        const recentProduct = user.products[user.products.length - 1];
        const product = await Product.findById(recentProduct._id); // Await the promise

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { name, Type, Airtemperature, Processtemperature, Rotationalspeed, Torque, Toolwear } = product;

        const requestBody = {
            "Type": Type,
            "Air Temperature": Airtemperature,
            "Process Temperature": Processtemperature,
            "Rotational Speed": Rotationalspeed,
            "Torque": Torque,
            "Tool wear": Toolwear
        };

        // Send data to prediction API
        const predictResponse = await axios.post(PREDICT_API_URL, requestBody);
        const predictionData = predictResponse.data;

        // Send data to plot API and get the plot image URL
        const plotResponse = await axios.post(PLOT_API_URL, requestBody);
        const plotImageUrl = plotResponse.data.imageUrl; // Assuming the API returns a JSON with imageUrl

        // Generate detailed report using Gemini API
        const geminiPrompt = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: "Generate a detailed report for the following product data with suggestions: " + JSON.stringify(requestBody) + "This is a data of products"}
                    ]
                }
            ]
        };

        const geminiResponse = await axios.post(GEMINI_API_URL, geminiPrompt, {
            headers: { 'Content-Type': 'application/json' }
        });

        // Log the Gemini API response for debugging
        console.log('Gemini API Response:', geminiResponse.data.candidates[0].content.parts);

        // Check if the Gemini API response contains the expected data
        if (!geminiResponse.data.candidates || !geminiResponse.data.candidates[0] || !geminiResponse.data.candidates[0].content) {
            return res.status(500).json({ message: 'Invalid response from Gemini API' });
        }

        const detailedReport = geminiResponse.data.candidates[0].content.parts.map(part => part.text);

        // Create a PDF document
        const doc = new PDFDocument();
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            let pdfData = Buffer.concat(buffers);
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfData),
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment;filename=Gemini_Report.pdf',
            }).end(pdfData);
        });

        // Add data and prediction to the PDF
        doc.fontSize(20).text('Gemini API Report', { align: 'center' });
        doc.fontSize(12).text(`Product Name: ${name}`);
        doc.text(`Type: ${Type}`);
        doc.text(`Air Temperature: ${Airtemperature}`);
        doc.text(`Process Temperature: ${Processtemperature}`);
        doc.text(`Rotational Speed: ${Rotationalspeed}`);
        doc.text(`Torque: ${Torque}`);
        doc.text(`Tool wear: ${Toolwear}`);
        doc.text(`Prediction: ${predictionData.prediction}`);
        doc.text(`Probability Maintenance Needed: ${predictionData.probability_maintenance_needed}`);
        doc.text(`Probability No Maintenance: ${predictionData.probability_no_maintenance}`);

        // Add the detailed report to the PDF
        // Add horizontal line
        doc.moveTo(72, doc.y + 20).lineTo(522, doc.y + 20).stroke();
        doc.moveDown();
        doc.moveDown();
        doc.text('Detailed Report', { align: 'center' });
        doc.fontSize(12).text(detailedReport);
        // End the PDF document
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating PDF', error });
    }
};

module.exports = { generatePdfController };
