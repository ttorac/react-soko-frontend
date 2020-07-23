import React from 'react'

class Stopwatch extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {hours: 0, minutes: 0, seconds: 0}

    start() {
        this.timerID = window.setInterval(() => this.tick(), 1000)
    }

    tick = () => {
        let {seconds, minutes, hours} = this.state
        if (++seconds === 60) {
            seconds = 0
            if (++minutes === 60) {
                minutes = 0
                hours++
            }
        }
        this.setState({seconds: seconds, minutes: minutes, hours: hours})
    }

    componentDidMount() {
        const {autoStart} = this.props
        if (autoStart !== undefined && autoStart !== null && autoStart) this.start()
    }

    componentWillUnmount() {
        window.clearInterval(this.timerID)
    }

    render() {
        return (<span>{this.state.hours.toString().padStart(2,'0')}:
            {this.state.minutes.toString().padStart(2,'0')}:
            {this.state.seconds.toString().padStart(2,'0')}</span>)
    }
}

export default Stopwatch