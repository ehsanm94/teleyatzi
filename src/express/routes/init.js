const router = require('express').Router();

const initController = require('../controllers/init');

router.post('/', initController.init);

module.exports = router;
