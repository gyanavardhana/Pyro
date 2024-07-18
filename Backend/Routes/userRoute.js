
const router = require('express').Router();
const userController = require('../Controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;