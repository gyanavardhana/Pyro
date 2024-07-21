const leaderboardController = require('../Controllers/leaderboardController');
const express = require('express');
const router = express.Router();

router.get('/getleaderboard', leaderboardController.getLeaderboard);

module.exports = router;