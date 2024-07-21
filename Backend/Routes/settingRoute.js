const router = require('express').Router();
const settingController = require('../Controllers/settingController');

router.get('/getdata', settingController.getData);
router.get('/getfavorites', settingController.getFavorites);

module.exports = router;