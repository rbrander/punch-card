import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Button } from '@contentful/forma-36-react-components';
import { init, locations } from './uie-sdk-hackathon-build';
import '@contentful/forma-36-react-components/dist/styles.css';
import TimeEntryReport from './time-entry-report';
import Tracker from './tracker';
import './index.css';

class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  }

  onClick = () => {
    this.props.sdk.dialogs.openExtension({
      id: 'time-entry-report',
      title: 'My Punchcard™️',
      width: 800
    });
  }

  render = () => {
    const isInDialog = this.props.sdk.location.is(locations.LOCATION_DIALOG);

    // When in the dialog render the report
    if (isInDialog) {
      return (
        <TimeEntryReport
          sdk={this.props.sdk}
          spaceId="5nguzj3e9yeb"
          environmentId="master"
        />
      );
    }

    // Now we know we are in the sidebar
    return (<Tracker sdk={this.props.sdk} />);
  };
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

// Enabling hot reload
if (module.hot) {
  module.hot.accept();
}
