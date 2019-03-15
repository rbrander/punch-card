import moment from 'moment';

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
