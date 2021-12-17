const router = require('express').Router();
const pullControllers = require('../controllers/pull-controllers.js');

router.get('/pr/commits', pullControllers.getCommits);

module.exports = router;