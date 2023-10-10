const router = require('express').Router();

router.use('/games', require('./games'));
router.use('/init', require('./init'));

module.exports = router;
