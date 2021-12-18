const helpers = require('./pull-helpers.js');
const url = require('url');

module.exports = {

  getCommits: async (req, res) => {
    const path = url.parse(req.query.url).path.split('/');
    const user = path[1];
    const repo = path[2];
    let commitData;
    let requestData;

    try {
      requestData = await helpers.getOpenPullRequests(user, repo);
      commitData = await helpers.getCommitsForOpenPullRequests(user, repo, requestData.data);
      res.status(200).send(commitData);
    } catch(e) {
      let message = 'error completing request - try again later'
      if (e.response.statusText.includes('Not Found')) {
        message = 'error finding user and repo combination - check that the repo exists for the entered user';
      }
      res.status(400).send(message);
    }
  }

};