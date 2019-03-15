import React from 'react';
import { Icon, Table, TableHead, TableBody, TableRow, TableCell, Subheading } from '@contentful/forma-36-react-components';
import './Daily.css';
import { groupData, formatSecondsAsTime } from './utils';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

export default class DailyView extends React.Component {
  state = {
    detailVisible: null
  }

  toggleDateDetailView = dateId => {
    if (this.state.detailVisible === dateId) {
      this.setState({
        detailVisible: null
      })
    } else {
      this.setState({
        detailVisible: dateId
      })
    }
  }

  render() {
    const { data } = this.props;

    const groupedData = groupData(data);

    return (
      <div>
        { Object.entries(groupedData).map(([date, data]) => (
          <React.Fragment>
            <div className="Daily__date" onClick={() => this.toggleDateDetailView(date)}>
            <div>
              <Subheading extraClassNames='Daily__subheading'>
                { this.state.detailVisible !== date && <Icon icon='ChevronRight' /> }
                { this.state.detailVisible === date && <Icon icon='ChevronDown' /> }
                {date}
              </Subheading>
              </div>
              {
                this.state.detailVisible === date && (
                  <Table extraClassNames='Daily__table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Entry</TableCell>
                        <TableCell>Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    { Object.entries(data).map(([entryId, timeInSeconds]) => (
                      <TableRow>
                        <TableCell>{entryId}</TableCell>
                        <TableCell>{formatSecondsAsTime(timeInSeconds)}</TableCell>
                      </TableRow>
                    ))}
                    </TableBody>
                  </Table>
                )
              }
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
}
