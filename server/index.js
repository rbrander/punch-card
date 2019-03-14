// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { appendData, readData } = require('./utils');
const TimeEntry = require('./time-entry');

// App specific
const app = express();
const PORT = 8080;

// Middleware for CORS and parsing body string into JSON object
app.use(cors());
app.use(bodyParser.json());

// Handler for accepting new time entry data
app.post('/time_entry', (req, resp, next) => {
  const timeEntryData = {...req.body, when: new Date().toISOString() };
  const timeEntry = new TimeEntry(timeEntryData);
  appendData(timeEntry);
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
