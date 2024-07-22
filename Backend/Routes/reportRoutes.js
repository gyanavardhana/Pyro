const express = require('express');
const router = express.Router();
const { generatePdfController} = require('../Controllers/reportController');

router.get('/generatePdf', generatePdfController);

module.exports = router;
