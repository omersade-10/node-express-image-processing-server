const { response } = require('express');
const express = require('express');
const path = require('path');

const app = express();

const pathjToIndex = path.resolve(__dirname, '../client/index.html');

module.exports = {
    app: app
};

app.use('/*', (request, response) => {
    response.sendFile(pathjToIndex);
});