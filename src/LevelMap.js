import React from 'react'

class LevelMap extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    classSuffixByDirection(dir) {
        switch (dir) {
            case 'ArrowUp':
                return '-up'
            case 'ArrowLeft':
                return '-left'
            case 'ArrowDown':
                return '-down'
            case 'ArrowRight':
                return '-right'
            default:
                return '-down'
        }
    }

    render() {

        const {game} = this.props
        const {history, width} = game
        const histCopy = history.slice()
        const latestRound = histCopy[histCopy.length-1]
        const tilesCopy = latestRound.tiles.slice()


        const level = tilesCopy.map((tile, i) => { // this should print latest tile setup since the obj passed by ref got modified in another method
            let className = `t${tile}`

            if (tile === 8 || tile === 9) {
                className += this.classSuffixByDirection(latestRound.action)
            }
            className += (i % width === 0) ? ' l' : ''

            return <div key={i} className={className} />
        })
                
        level.push(<div className="spacer"></div>) // add spacer at the end
        return level
    }
}

export default LevelMap