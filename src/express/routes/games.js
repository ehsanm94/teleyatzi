const router = require('express').Router();

const gamesController = require('../controllers/games');

router.post('/new-game', gamesController.newGame);
router.post('/roll', gamesController.roll);
router.post('/play', gamesController.play);
router.post('/leave', gamesController.leave);
router.post('/resume', gamesController.resume);

module.exports = router;
