const router = require('express').Router();
const controllers = require('../controllers/pull-controllers.js');

router.get('/pr/commits', controllers.getCommits);

module.exports = router;