import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

export function groupData(data) {
  return data.reduce((memo, datum) => {
    const day = moment(datum.when).format('MMM Do YYYY');

    if (!memo[day]) {
      memo[day] = {};
    }

    if (!memo[day][datum.entryName]) {
      memo[day][datum.entryName] = datum.timeInSeconds;
    } else {
      memo[day][datum.entryName] = memo[day][datum.entryName] + datum.timeInSeconds
    }

    return memo;
  }, {});
}

export function groupDataByDay(data) {
  return data.reduce((memo, datum) => {
    const day = moment(datum.when).format('MMM Do YYYY');

    if (!memo[day]) {
      memo[day] = 0;
    }

    memo[day] = memo[day] + datum.timeInSeconds;

    return memo;
  }, {});
}

export function groupDataByEntry(data) {
   return data.reduce((memo, datum) => {
     if (!memo[datum.entryName]) {
       memo[datum.entryName] = 0;
     }

     memo[datum.entryName] = memo[datum.entryName] + datum.timeInSeconds;

     return memo;
   }, {});
}

export function formatSecondsAsTime(secs) {
  return moment.duration(secs, 'seconds').format('h [hrs], m [min]');
}

export function truncate(str) {
  if (str.length > 30) {
    return `${str.substr(0, 27)}...`
  }

  return str;
}

// Adopted from https://gist.github.com/caseyjustus/1166258
export function median(values) {
  values.sort((a,b) => a - b);

  const half = Math.floor(values.length/2);

  if(values.length % 2) {
    return values[half];
  } else {
    return (values[half-1] + values[half]) / 2.0;
  }
}

const formatDate = (dateISOstring) => new Date(dateISOstring).toLocaleString();

export default {
  formatDate
}
