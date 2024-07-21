const router = require('express').Router();
const leaderController = require('../Controllers/leaderController');

router.post('/addfavorites', leaderController.addToFavorites);
router.delete('/removefavorites', leaderController.removeFromFavorites);

module.exports = router;