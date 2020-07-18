import React from 'react'

class LevelMap extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        // let {action} = this.props
        
        // // get data
        // const {history, width} = this.state
        // const histCopy = history.slice()
        // window.alert(action)
        // const tilesCopy = histCopy[histCopy.length-1].tiles.slice()
        
        // const objRounds = histCopy.concat([{tiles: tilesCopy, action: null, position: null}])
        
        // AUDIT - this may need to be audit by someone more experienced
        // const obj = {tiles: null, action: null, position: null}
        
        // let {action} = this.props
        
        // window.alert(action) - DEBUG
        // if (action != null) {
            //     this.doAction(action, objRounds)
            //     action = null
            //     // need to provide updated tiles
            // }
            
        const {game} = this.props
        const {history, width} = game
        const histCopy = history.slice()
        // console.log(histCopy.length)
        // console.log(JSON.stringify(histCopy) + '\n' + history.length)
        // console.log(JSON.stringify(histCopy))
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