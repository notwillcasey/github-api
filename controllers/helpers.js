const axios = require('axios');

module.exports = {

  getOpenPullRequests: (user, repo) => {
    const url = `https://api.github.com/repos/${user}/${repo}/pulls?status=open`;
    const options = {
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${process.env.TOKEN}`
      }
    }

    return axios.get(url, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(`ERROR getting open pull requests for user { ${user} } and repo { ${repo} }`);
      return null;
    })
  },

  getCommitsForOpenPullRequests: (user, repo, openRequests) => {
    const commitHistoryRequests = [];

    for (let pull of openRequests) {
      let pullData = {
        user: user,
        repo: repo,
        pull_number: pull.number,
        pull_title: pull.title
      }

      let commitHistoryPromise = new Promise((resolve, reject) => {
        let url = `https://api.github.com/repos/${user}/${repo}/pulls/${pull.number}/commits`;
        const options = {
          headers: {
            'User-Agent': 'request',
            'Authorization': `token ${process.env.TOKEN}`
          }
        };
        return axios.get(url, options)
          .then((data) => {
            pullData.number_of_commits = data.data.length
            resolve(pullData);
          })
          .catch((err) => {
            reject(err);
          })
      })

      commitHistoryRequests.push(commitHistoryPromise);
    }

    return Promise.all(commitHistoryRequests)
  }

};