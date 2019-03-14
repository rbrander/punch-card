import React from 'react';
import PropTypes from 'prop-types';
import { Tab, TabPanel, Tabs } from '@contentful/forma-36-react-components';

class TimeEntryReport extends React.Component {
  state = {
    tabId: 'dashboard'
  }

  selectTab = tabId => {
    this.setState({
      tabId
    })
  }

  render() {
    return (
      <div>
        <Tabs>
          <Tab
            id='dashboard'
            selected={this.state.tabId === 'dashboard'}
            onSelect={() => this.selectTab('dashboard')}
          >
            Dashboard
          </Tab>
          <Tab
            id='daily'
            selected={this.state.tabId === 'daily'}
            onSelect={() => this.selectTab('daily')}
          >
            Daily
          </Tab>
          <Tab
            id='graphs'
            selected={this.state.tabId === 'graphs'}
            onSelect={() => this.selectTab('graphs')}
          >
            Overview
          </Tab>
        </Tabs>
        {
          this.state.tabId === 'dashboard' && (
            <TabPanel id='dashboard'>
              <h1>Dashboard</h1>
            </TabPanel>
          )
        }
        {
          this.state.tabId === 'daily' && (
            <TabPanel id='daily'>
              <h1>Daily</h1>
            </TabPanel>
          )
        }
        {
          this.state.tabId === 'graphs' && (
            <TabPanel id='graphs'>
              <h1>Graphs</h1>
            </TabPanel>
          )
        }
      </div>
    );
  }
}

TimeEntryReport.propTypes = {
  sdk: PropTypes.object.isRequired
};

export default TimeEntryReport;
