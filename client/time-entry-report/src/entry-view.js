import React from 'react';
import {
  Icon,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField
} from '@contentful/forma-36-react-components';
import Utils from './utils';
import './EntryView.css';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

const SORTBY_DATE = 'when';
const SORTBY_ENTRY = 'entry';
const SORTBY_DURATION = 'duration';

const sortMethods = {
  [SORTBY_ENTRY]: dir => (a, b) =>
    dir === 'ascending' ?
      a.entryName.localeCompare(b.entryName) :
      b.entryName.localeCompare(a.entryName),
  [SORTBY_DATE]: dir => (a, b) =>
    dir === 'ascending' ?
      new Date(b.when).getTime() - new Date(a.when).getTime() :
      new Date(a.when).getTime() - new Date(b.when).getTime(),
  [SORTBY_DURATION]: dir => (a, b) =>
    dir === 'ascending' ?
      b.timeInSeconds - a.timeInSeconds :
      a.timeInSeconds - b.timeInSeconds
};

class EntryView extends React.Component {
  state= {
    sortDirection: 'ascending',
    sortColumn: SORTBY_DATE,
    data: [...this.props.data] // clone the data array so we can mutate it via sorting
  }

  componentDidMount = () => {
    this.sortData();
  }

  sortData = () => {
    const { data, sortColumn, sortDirection } = this.state;
    const sortMethod = sortMethods[sortColumn](sortDirection);
    this.setState({ data: [...data].sort(sortMethod) })
  }

  sortBy = (column) => {
    let { sortColumn, sortDirection } = this.state;
    if (sortColumn === column) {
      // invert the sort direction
      sortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
    } else {
      sortDirection = 'ascending';
    }
    this.setState({ sortColumn: column, sortDirection }, this.sortData);
  }

  onChangeSearch = (e) => {
    const searchString = e.target.value;
    const filteredData = this.props.data
      .filter(datum => datum.entryName.toLowerCase().includes(searchString.toLowerCase()));
    this.setState({ data: filteredData }, this.sortData);
  }

  render() {
    const { data, sortColumn, sortDirection } = this.state;
    const sortIcon = sortDirection === 'ascending' ? 'ChevronDown' : 'ChevronUp';
    return (
      <div className="entry-view__container">
        <TextField
          name="search"
          id="search"
          labelText="Search"
          textInputProps={{ placeholder: 'Search...' }}
          onChange={this.onChangeSearch}
        />
        <br />
        <Table>
          <TableHead isSticky>
            <TableRow>
              <TableCell extraClassNames="entry-view__pointer" onClick={() => this.sortBy(SORTBY_ENTRY)}>
                Entry
                {sortColumn === SORTBY_ENTRY &&
                  <Icon icon={sortIcon} />
                }
              </TableCell>
              <TableCell extraClassNames="entry-view__pointer" onClick={() => this.sortBy(SORTBY_DATE)}>
                When
                {sortColumn === SORTBY_DATE &&
                  <Icon icon={sortIcon} />
                }
              </TableCell>
              <TableCell extraClassNames="entry-view__pointer" onClick={() => this.sortBy(SORTBY_DURATION)}>
                Duration
                {sortColumn === SORTBY_DURATION &&
                  <Icon icon={sortIcon} />
                }
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ entryName, when, timeInSeconds }, idx) => (
              <TableRow key={idx}>
                <TableCell>{entryName}</TableCell>
                <TableCell>{moment(when).format('MMM D YYYY @ H:mm:ss A')}</TableCell>
                <TableCell>{moment.duration(timeInSeconds, 'seconds').format('h [hrs], m [min], s [sec]')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default EntryView;
