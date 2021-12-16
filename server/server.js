const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routers/routes.js');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

module.exports = app;