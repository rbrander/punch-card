import moment from 'moment';

export function groupData(data) {
  return data.reduce((memo, datum) => {
    const day = moment(datum.when).format('MMM Do YYYY');

    if (!memo[day]) {
      memo[day] = {};
    }

    if (!memo[day][datum.entryId]) {
      memo[day][datum.entryId] = datum.timeInSeconds;
    } else {
      memo[day][datum.entryId] = memo[day][datum.entryId] + datum.timeInSeconds
    }

    return memo;
  }, {});
}

const formatDate = (dateISOstring) => new Date(dateISOstring).toLocaleString();

export default {
  formatDate
}
