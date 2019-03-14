import React from 'react';
import PropTypes from 'prop-types';
import { Tab, TabPanel, Tabs } from '@contentful/forma-36-react-components';
import ReportDetails from './report-details';
import Dashboard from './dashboard';
import DailyView from './daily-view';
import EntryView from './entry-view';

const TAB_DASHBOARD = 'dashboard';
const TAB_DAILY_VIEW = 'daily-view';
const TAB_ENTRY_VIEW = 'entry-view';

class TimeEntryReport extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
  }

  state = {
    tabId: TAB_DASHBOARD,
    data: []
  }

  selectTab = tabId => this.setState({ tabId })

  componentDidMount = () => {
    const { spaceID, environment } = this.props;
    const host = 'http://localhost:8080';
    const queryString = `?spaceID=${spaceID}&environment=${environment}`;
    const url = `${host}/report${queryString}`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render = () => {
    const { tabId, data } = this.state;
    return (
      <div>
        <ReportDetails />
        <Tabs>
          <Tab
            id={TAB_DASHBOARD}
            selected={tabId === TAB_DASHBOARD}
            onSelect={() => this.selectTab(TAB_DASHBOARD)}
          >
            Dashboard
          </Tab>
          <Tab
            id={TAB_DAILY_VIEW}
            selected={tabId === TAB_DAILY_VIEW}
            onSelect={() => this.selectTab(TAB_DAILY_VIEW)}
          >
            Daily View
          </Tab>
          <Tab
            id={TAB_ENTRY_VIEW}
            selected={tabId === TAB_ENTRY_VIEW}
            onSelect={() => this.selectTab(TAB_ENTRY_VIEW)}
          >
            Entry View
          </Tab>
        </Tabs>
        {
          tabId === TAB_DASHBOARD && (
            <TabPanel id={TAB_DASHBOARD}>
              <Dashboard />
            </TabPanel>
          )
        }
        {
          tabId === TAB_DAILY_VIEW && (
            <TabPanel id={TAB_DAILY_VIEW}>
              <DailyView />
            </TabPanel>
          )
        }
        {
          tabId === TAB_ENTRY_VIEW && (
            <TabPanel id={TAB_ENTRY_VIEW}>
              <EntryView data={data} />
            </TabPanel>
          )
        }
      </div>
    );
  }
}

export default TimeEntryReport;
