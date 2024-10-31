// Write your code here
import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {minutes: '00', seconds: '00'}

  componentWillUnmount() {
    clearInterval(this.clearId)
  }

  start = () => {
    this.clearId = setInterval(this.tick, 1000)
    return this.setState({running: true})
  }

  reset = () => {
    clearInterval(this.clearId)
    return this.setState({minutes: '00', seconds: '00', running: false})
  }

  stop = () => {
    clearInterval(this.clearId)
    return this.setState(prev => ({
      minutes: prev.minutes,
      seconds: prev.seconds,
      running: false,
    }))
  }

  tick = () => {
    const {seconds} = this.state
    if (seconds === '59') {
      return this.setState(prev => {
        if (prev.minutes < 9) {
          return {
            minutes: '0'.concat(`${parseInt(prev.minutes) + 1}`),
            seconds: '00',
          }
        }
        return {minutes: `${parseInt(prev.minutes) + 1}`, seconds: '00'}
      })
    }
    return this.setState(prev => {
      if (prev.seconds < 9) {
        return {seconds: '0'.concat(`${parseInt(prev.seconds) + 1}`)}
      }
      return {seconds: `${parseInt(prev.seconds) + 1}`}
    })
  }

  render() {
    const {minutes, seconds, running} = this.state
    return (
      <div className="home-watch">
        <div className="main-container">
          <h1 className="heading">Stopwatch</h1>
          <div className="stopwatch-container">
            <div className="image-timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="watch-image"
              />
              <p className="text">Timer</p>
            </div>
            <h1 className="time-text">
              {minutes}:{seconds}
            </h1>
            <div className="btn-container">
              <button
                type="button"
                className="btn start-btn"
                onClick={this.start}
                disabled={running}
              >
                Start
              </button>
              <button
                type="button"
                className="btn stop-btn"
                onClick={this.stop}
              >
                Stop
              </button>
              <button
                type="button"
                className="btn reset-btn"
                onClick={this.reset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
