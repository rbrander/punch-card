import React from 'react';
import echarts from 'echarts';
import { Card, SectionHeading, Paragraph } from '@contentful/forma-36-react-components';
import { groupDataByEntry, groupDataByDay, formatSecondsAsTime, truncate, median } from './utils';
import { COLOR_PALETTE } from './constants';

import './Dashboard.css';

export default class Dashboard extends React.Component {
  componentDidMount() {
    const { data } = this.props;

    // TODO: Top 5 entries?
    const dataSet = Object.entries(groupDataByEntry(data));

    const pieChartInstance = echarts.init(this.pieChartRef, null, {
      renderer: 'canvas'
    });

    pieChartInstance.setOption({
      legend: {
        formatter: name => truncate(name)
      },
      color: COLOR_PALETTE,
      dataset: {
        source: dataSet
      },
      series: [
        {
          type: 'pie',
          id: 'pie',
          radius: '50%',
          // center: ['50%', '25%'],
          label: {
            formatter({ data: [_,time]}) {
              return formatSecondsAsTime(time);
            }
          }
        }
      ]
    })
  }

  render() {
    const { data } = this.props;

    const totalTime = data.reduce((memo, datum) => {
      return memo + datum.timeInSeconds;
    }, 0);
    const medianValue = median(Object.values(groupDataByDay(data)));

    const mostPopularEntryName = Object.entries(groupDataByEntry(data)).reduce((memo, [name, time]) => {

      if (time > memo.time) {
        return {
          name,
          time
        }
      }

      return memo;
    }, { time: -1 }).name;

    return (
      <div className='Dashboard__container'>
        <div className='Dashboard__overview'>
          <Card extraClassNames='Dashboard__card'>
            <SectionHeading>Total time</SectionHeading>
            <Paragraph>{formatSecondsAsTime(totalTime)}</Paragraph>
          </Card>
          <Card extraClassNames='Dashboard__card'>
            <SectionHeading>Avg time</SectionHeading>
            <Paragraph>{formatSecondsAsTime(medianValue)}</Paragraph>
          </Card>
          <Card extraClassNames='Dashboard__card'>
            <SectionHeading>Most popular entry</SectionHeading>
            <Paragraph>{mostPopularEntryName}</Paragraph>
          </Card>
        </div>
        <div
          className='Dashboard__pie-chart'
          ref={ref => this.pieChartRef = ref}
          style={{
            width: '100%',
            height: '300px'
          }}
        />
      </div>
    );
  }
}
