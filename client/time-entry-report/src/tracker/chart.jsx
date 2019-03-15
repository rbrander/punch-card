import React from 'react'
import echarts from 'echarts'
import Moment from 'moment'
import { HelpText } from '@contentful/forma-36-react-components';
import { COLOR_PALETTE } from '../constants';

export default class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.chart = React.createRef()
  };

  componentDidMount = () => {
    console.log(this.chart.current)
    console.log(Object.keys(this.props.data))

    const sortedArray = this.props.data.sort((a, b) => new Moment(a.date).format('YYYYMMDD') - new Moment(b.date).format('YYYYMMDD'))

    let myChart = echarts.init(this.chart.current, 'macarons');

    // specify chart configuration item and data
    let option = {
      grid: {
        top: 30,
        bottom: 50
      },
      color: COLOR_PALETTE,
      animation: false,
      tooltip: {},
      legend: {
        data: ['Time Spent']
      },
      xAxis: {
        data: sortedArray.map((entry) => {
          return entry.date.slice(5)
        }),
        axisLabel: {
          rotate: 60
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Time',
        type: 'line',
        data: sortedArray.map((entry) => {
          return Math.floor(entry.count / 60)
        })
      }]
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);
  }

  render = () => {
    return (
      <div style={{ paddingBottom: 20 }}>
        <div
          ref={this.chart}
          style={{ height: 200 }}
        >
        </div >
        <div style={{ textAlign: "center" }}>
          <HelpText>Time Spent Last 7 Days</HelpText>
        </div>
      </div>
    )
  };

}

