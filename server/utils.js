const { readFileSync, writeFileSync } = require('fs');

const DATA_FILE = 'data.json';

/*
  Takes an object and appends it to the data file, and returns the object
 */
function appendData(obj) {
  const data = readData();

  data.push(obj);

  writeFileSync(DATA_FILE, JSON.stringify(data));

  return obj;
}

/*
  Reads the current data in the data file and returns it as an object
 */
function readData() {
  let raw;

  try {
    raw = readFileSync(DATA_FILE, 'utf8');
  } catch (e) {
    raw = "[]"
  }

  const parsed = JSON.parse(raw);

  return parsed;
}

module.exports = {
  appendData,
  readData
}
