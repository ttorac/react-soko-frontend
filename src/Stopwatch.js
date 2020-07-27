import React from 'react'

class Stopwatch extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.initState
    }

    initState = {hours: 0, minutes: 0, seconds: 0}

    start() { // should only happen once
        console.log('started')
        if (!this.timerID) {
            this.reset()
            this.timerID = window.setInterval(() => this.tick(), 1000)   
        }
    }

    reset() {
        this.setState(this.initState)
    }

    stop() {
        window.clearInterval(this.timerID)
        this.timerID = null
    }

    // split() {}

    // submit() {
    //     // const {hours, minutes, seconds} = this.state
    //     // const {timeHandler} = this.props
    //     // timeHandler(`${hours}:${minutes}:${seconds}`)
    // }

    tick = () => {
        const {timeHandler} = this.props
        this.setState( prevState => {
            // console.log('inside setState: '+autoStart)
            let {seconds, minutes, hours} = prevState
            if (++seconds === 60) {
                seconds = 0
                if (++minutes === 60) {
                    minutes = 0
                    hours++
                }
            }

            const newTime = {seconds: seconds, minutes: minutes, hours: hours}
            timeHandler(newTime)
            return newTime
        })
    }

    componentDidMount() {
        const {autoStart} = this.props
        if (autoStart) this.start()
    }

    componentDidUpdate() {
        const {autoStart, intermission} = this.props
        if (autoStart) this.start()
        else if (intermission) this.stop()
    }

    componentWillUnmount() {
        window.clearInterval(this.timerID)
        this.timerID = null
    }

    render() {
        return (<span>{this.state.hours.toString().padStart(2,'0')}:
            {this.state.minutes.toString().padStart(2,'0')}:
            {this.state.seconds.toString().padStart(2,'0')}</span>)
    }
}

export default Stopwatch