# github-api

## API Endpoint Reference

### GET /pr/commits

QUERY PARAMS :
> url must follow exact input as above where USER is the github username and REPO is the github repositry name
```
url: https://github.com/USER/REPO
```
RESPONSE FORMAT :
> returns an array of objects containing data for each open PR in the provided repository
```
[
    {
        pull_number: (integer)
        pull_title: (string)
        number_of_commits: (integer)
    },
    ...
]
```
  
  ## Installation 

- Clone code to your local machine using the method of your choice (https, ssh, or GitHub CLI)
- On your local machine, add a new file named '.env' to the repository and add the required environment variables (see sample.env or below example for reference). GitHub personal access tokens are required to access data from the github API with fewer restrictions.
```
PORT=(personal choice of port number)
TOKEN=(github personal access token)
```
In the root folder for the repository on your local macine, exceute the following to start the Node.js server:

- Run 'npm install' to install dependencies
- Run 'npm start' to start the server
