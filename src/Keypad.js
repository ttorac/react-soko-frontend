import React from 'react'

class Keypad extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.initState
    }

    initState = {
        keys: {
            ArrowUp: false,
            ArrowLeft: false,
            ArrowDown: false,
            ArrowRight: false
        }
    }

    handleKeyDown = (e) => {
        this.setState({keys: {[e.code]: true}})
        this.props.callback(e.code)
        // console.log(this.state)
        console.log(`keydown: ${e.code}\n`)
    }
        

    handleKeyUp = (e) => {
        // const {keys} = this.state
        this.setState({keys: {[e.code]: false}})
    }
    

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown)
        document.addEventListener("keyup", this.handleKeyUp)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown)
        document.removeEventListener("keyup", this.handleKeyUp)
    }

    render() {

        const {keys} = this.state

        return (
            <div className="keypad">
                <div className="key"></div>
                <div id="arrowUp" className={(keys.ArrowUp ? "lit " : "")+"key arrowUpKey"}>&#8593;</div>
                <div className="key"></div>
                <div id="arrowLeft" className={(keys.ArrowLeft ? "lit " : "")+"key arrowLeftKey"}>&#8592;</div>
                <div id="arrowDown" className={(keys.ArrowDown ? "lit " : "")+"key arrowDownKey"}>&#8595;</div>
                <div id="arrowRight" className={(keys.ArrowRight ? "lit " : "")+"key arrowRightKey"}>&#8594;</div>
            </div>
        )
    }
}

export default Keypad