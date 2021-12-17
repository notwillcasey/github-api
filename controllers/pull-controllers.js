const helpers = require('./helpers.js');

module.exports = {

  getCommits: (req, res) => {
    const reqParams = req.query.url.slice(19).split('/');
    const user = reqParams[0];
    const repo = reqParams[1];

    return helpers.getOpenPullRequests(user, repo)
      .then((requestData) => {
        if (requestData == null) {
          return 'not matching user and repo'
        } else {
          return helpers.getCommitsForOpenPullRequests(user, repo, requestData)
        }
      })
      .then((commitData) => {
        if (commitData === 'not matching user and repo') {
          res.status(400).send('error finding user and repo combination - check that the repo exists for the entered user');
        } else {
          res.status(200).send(commitData);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send('error - try again later');
      });
  }

};