const express = require('express');
const bodyParser = require('body-parser');
const { appendData, readData } = require('./utils');

const app = express();

const PORT = 8080;

app.post('/time_entry', (req, resp, next) => {
  resp.sendStatus(200);
});

app.get('/report', (req, resp, next) => {
  const data = readData();

  resp
    .status(200)
    .json(data);
});

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
})
