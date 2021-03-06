const helpers = require('./pull-helpers.js');
const url = require('url');

module.exports = {

  getCommits: async (req, res) => {

    console.log(req.query)
    let path, user, repo, badInput;
    /*
      req.query.url is expected to be in the following format:
        https://github.com/USER/REPO
    */
    if (typeof req.query.user === 'string' && typeof req.query.repo === 'string') {
      user = req.query.user;
      repo = req.query.repo;
      !user || !repo ? badInput = true : badInput = false;
    } else {
      user = null;
      repo = null;
      badInput = true;
    }

    try {
      let requestData = await helpers.getOpenPullRequests(user, repo);
      let commitData = await helpers.getCommitsForOpenPullRequests(user, repo, requestData.data);
      res.status(200).send(commitData);
    } catch(e) {
      let message = 'error completing request - try again later';
      let code = 400;

      if (badInput) {
        message = 'malformed query parameters - verify input URL is in expected format';
      } else if (e.response.status === 404 && !badInput) {
        message = 'error finding user and repo combination - check that the repo exists for the entered user';
        code = 404;
      }
      res.status(code).send(message);
    }
  },



};