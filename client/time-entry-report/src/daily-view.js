import React from 'react';
import { Icon } from '@contentful/forma-36-react-components';
import './Daily.css';

const dates = [
  {
    id: '20190315',
    name: 'March 15, 2019'
  },
  {
    id: '20190314',
    name: 'March 14, 2019'
  },
  {
    id: '20190313',
    name: 'March 13, 2019'
  },
  {
    id: '20190312',
    name: 'March 12, 2019'
  },
  {
    id: '20190311',
    name: 'March 11, 2019'
  },
  {
    id: '20190310',
    name: 'March 10, 2019'
  },
  {
    id: '20190309',
    name: 'March 9, 2019'
  },
]

export default class DailyView extends React.Component {
  render() {
    return (
      <div>
        { dates.map(date => (
          <React.Fragment>
            <div className='Daily__date' date={date.id}>
              <Icon icon='ChevronRight' />
              {date.name}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
}
