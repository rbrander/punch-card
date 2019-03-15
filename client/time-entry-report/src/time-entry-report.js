import React from 'react';
import PropTypes from 'prop-types';
import { Tab, TabPanel, Tabs, Spinner } from '@contentful/forma-36-react-components';
import ReportDetails from './report-details';
import Dashboard from './dashboard';
import DailyView from './daily-view';
import EntryView from './entry-view';
import { uniq } from 'lodash';

import './TimeEntryReport.css';

const TAB_DASHBOARD = 'dashboard';
const TAB_DAILY_VIEW = 'daily-view';
const TAB_ENTRY_VIEW = 'entry-view';

class TimeEntryReport extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
  }

  state = {
    tabId: TAB_DASHBOARD,
    data: [],
    userFullName: `${this.props.sdk.user.firstName} ${this.props.sdk.user.lastName}`,
    avatarUrl: this.props.sdk.user.avatarUrl,
    roles: this.props.sdk.user.spaceMembership.roles.map(role => role.name),
    startDate: 'Mar 2, 2019',
    endDate: 'Mar 15, 2019',
    isLoading: true,
    error: false
  }

  selectTab = tabId => this.setState({ tabId })

  componentDidMount = async () => {
    const { spaceId, environmentId, sdk } = this.props;
    const userId = this.props.sdk.user.sys.id;
    const host = 'http://localhost:8080';
    const queryString = `?spaceId=${spaceId}&environmentId=${environmentId}&userId=${userId}`;
    const url = `${host}/report${queryString}`;

    let data;

    try {
      const resp = await fetch(url);
      data = await resp.json();
    } catch (e) {
      this.setState({
        error: true
      });

      return;
    }

    // Get all entry IDs and content types
    const entryIds = uniq(data.map(datum => datum.entryId));
    const [{ items: contentTypes }, { items: entries }] = await Promise.all([
      sdk.space.getContentTypes(),
      sdk.space.getEntries({
        'sys.id[in]': entryIds.join(',')
      })
    ]);

    // Correlate the content type displayField with the entry content type
    data = data.map(datum => {
      const entry = entries.find(e => e.sys.id === datum.entryId);
      const { sys: { contentType: { sys: { id: contentTypeId } } } } = entry;
      const { displayField } = contentTypes.find(ct => ct.sys.id === contentTypeId);

      // NOTE: In reality we would need to know the real default locale, because
      // this is coming from the CMA. Since the default locale is `en-US` if none
      // is set, we use that here.
      datum.entryName = entry.fields[displayField]['en-US'];

      return datum;
    });

    this.setState({
      data,
      isLoading: false
    });
  }

  render = () => {
    const { tabId, data, userFullName, avatarUrl, roles, startDate, endDate, isLoading } = this.state;
    return (
      <div className='TimeEntryReport__container'>
      { isLoading && <div className="TimeEntryReport__loading"><Spinner /></div> }
      { !isLoading &&
        <React.Fragment>
          <ReportDetails
            name={userFullName}
            roles={roles}
            avatarUrl={avatarUrl}
            startDate={startDate}
            endDate={endDate}
          />
          <Tabs extraClassNames='TimeEntryReport__tabs'>
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
                <Dashboard data={data} />
              </TabPanel>
            )
          }
          {
            tabId === TAB_DAILY_VIEW && (
              <TabPanel id={TAB_DAILY_VIEW}>
                <DailyView data={data} />
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
        </React.Fragment>
      }
      </div>
    );
  }
}

export default TimeEntryReport;
