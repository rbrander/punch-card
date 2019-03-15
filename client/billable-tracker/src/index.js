import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Button, Heading, HelpText } from '@contentful/forma-36-react-components';
import { init } from './uie-sdk-hackathon-build.js';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import moment from 'moment'
import { BASE_URL } from './constants'
import { formatTimer } from './util'
import debounce from 'lodash.debounce';

const ACTIVITY_DEBOUNCE_TIME = 500;

class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
  };


  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      running: false,
      timer: 0,
      history: {}
    }
  }

  componentDidMount() {
    this.fetchHistory();
    this.setupActivityListener();
    this.props.sdk.window.startAutoResizer();
  }

  fetchHistory() {
    let url = new URL(`${BASE_URL}/report`),
      params = { userId: this.props.sdk.user.sys.id, entryId: this.props.sdk.entry.getSys().id }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        let aggregated = res
          .filter(entry => {
            return moment(entry.when).isAfter(moment(new Date()).subtract(7, 'days'))
          })
          .reduce((acc, entry) => {
            let date = entry.when.split('T')[0]
            if (acc[date]) {
              acc[date] += entry.timeInSeconds
            }
            acc[date] = entry.timeInSeconds
            return acc
          }, {})
        this.setState({ history: aggregated })
      })
      .catch(error => {
        console.log(`Oops. ${error}`)
      })
  }

  setupActivityListener () {
    const listener = isActive => {
      if (isActive && !this.state.running) {
        this.onStart();
      } else if (!isActive && this.state.running) {
        this.onStop();
      }
    };

    this.props.sdk.entry.onEditorActivityChanged(
      debounce(listener, ACTIVITY_DEBOUNCE_TIME, { leading: false, trailing: true })
    )
  }

  render = () => {
    if (this.state.running) {
      return (
        <div>
          <HelpText>
            Your time has started ticking!{' '}
            <span
              style={{cursor: 'wait'}}
              onMouseEnter={() => this.setState({ isVisible: true })}
              onMouseLeave={() => this.setState({ isVisible: false })}
            >
              ({this.state.isVisible ? formatTimer(this.state.timer) : 'show time'})
            </span>
          </HelpText>
          <Button onClick={this.onStop} isFullWidth={true}>Stop</Button>
        </div >
      )
    } else {
      return (<Button onClick={this.onStart} isFullWidth={true}>Start</Button>)
    }
  };

  onStart = () => {
    this.interval = setInterval(() => {
      this.setState((state) => {
        return { timer: state.timer + 1 }
      })
    }, 1000)
    this.setState({ running: true })
  }

  onStop = () => {
    clearInterval(this.interval)
    fetch(`${BASE_URL}/time_entry`, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        spaceId: this.props.sdk.entry.getSys().space.sys.id,
        environmentId: this.props.sdk.entry.getSys().environment.sys.id,
        userId: this.props.sdk.user.sys.id,
        timeInSeconds: this.state.timer,
        entryId: this.props.sdk.entry.getSys().id
      })
    }).catch(err => {
      console.log(`Error posting time: ${err}`)
    })
    this.setState({ running: false, timer: 0, isVisible: false })
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

// Enabling hot reload
if (module.hot) {
  module.hot.accept();
}
