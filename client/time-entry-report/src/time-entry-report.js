import React from 'react';
import PropTypes from 'prop-types';

class TimeEntryReport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Hello World!</div>
    );
  }
}

TimeEntryReport.propTypes = {
  sdk: PropTypes.object.isRequired
};

export default TimeEntryReport;
