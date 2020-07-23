import React from 'react'

class LevelMap extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
            
        const {game} = this.props
        const {history, width} = game
        const histCopy = history.slice()
        const tilesCopy = histCopy[histCopy.length-1].tiles.slice()


        const level = tilesCopy.map((tile, i) => { // this should print latest tile setup since the obj passed by ref got modified in another method

                const className = (i % width === 0) ? `t${tile} l` : `t${tile}`

                return <div key={i} className={className} />
            }
        )

        return level
    }
}

export default LevelMap