import React from 'react'
import Stopwatch from './Stopwatch'
import { Key } from './Key'

class Scoreboard extends React.Component {
    constructor(props) {
        super(props)
        this.numMovesDisplay = 3
    }

    triggerStopwatch = () => this.refs.child.start()

    render() {
        const {level, moves, moveCount} = this.props.score
        const m = moves.slice()
        let lastMoves = []

        if (m !== null && m !== undefined) {
            for (let l = 0; l < this.numMovesDisplay && m.length > 0 ;) {
                let item = m.pop()
                l = lastMoves.push(item)
                // console.log(`lastMoves:${l}, moves: ${m.length}`)
            }
        }

        return (
            <div style={{fontFamily: 'Courier'}}>
                <h2>Level {level}</h2>
                <dl>
                    <dt>Time Elapsed:</dt>
                    <dd><Stopwatch ref="child" autoStart={false} /></dd>
                    <dt>Move Count:</dt>
                    <dd>{moveCount}</dd>
                    <dt>Last Moves:</dt>
                    <dd>{lastMoves.map((value, index) => <Key key={index} keyCode={value} />)}</dd>
                </dl>
            </div>
        )
    }
}

export default Scoreboard