const router = require('express').Router();
const mlController = require('../Controllers/mlController');

router.post('/createProduct', mlController.createProduct);

module.exports = router;

