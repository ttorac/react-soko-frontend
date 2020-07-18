import React from 'react';
import LevelMap from './LevelMap'
import Keypad from './Keypad'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initState
  }
  
  initState = {
    history: [
        {
            tiles: [            // 0. floor, 1. wall, 2. mark, 3. box on floor, 4. box on mark, 9. character, 8. character on mark
            1,1,1,1,1,1,1,1,    // for trail purposes, 3 yields 0, 4 yelds 2, 8 yelds 2
            1,0,0,0,0,0,0,1,
            1,0,0,0,0,2,0,1,
            1,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,9,3,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,1
            ],
            action: null,
            position: null // initial position
        }
    ],
    width: 8,
    height: 8,
    initPos: 41,
    moveCount: 0
  }

  actionHandler = (action) => {
    // let {action} = this.props

    // // get data
    const {history} = this.state
    const histCopy = history.slice()
    const curerntRound = this.getCurrentRound(histCopy)
    const tilesCopy = curerntRound.tiles.slice()

    const objRounds = histCopy.concat([{tiles: tilesCopy, action: curerntRound.action, position: curerntRound.position}])
    
    // AUDIT - this may need to be audit by someone more experienced
    // const obj = {tiles: null, action: null, position: null}

    // let {action} = this.props

    // window.alert(action) - DEBUG
    // if (action != null) {
    //     this.doAction(action, objRounds)
    //     action = null
    //     // need to provide updated tiles
    // }
    // window.alert('handler: ' + action + ', ' + objRounds)
    this.doAction(action, objRounds)
    
    // this.setState({dir: dir})

  }

  doAction(action, rounds) { //TODO - might need rework or rename
    // currentRound = this.getCurrentRound(rounds) // FIX - this may change
    // rounds
    const currentPosition = this.getCurrentPosition(rounds)
    // window.alert('\nin do action: ' + JSON.stringify(rounds))
    if  (this.isMoveLegal(currentPosition, action, rounds)) {
        this.doShift(currentPosition, action, rounds)
    }
  }

  doShift(pos, dir, rounds) {

      // const {tiles} = this.state - using whats coming from render()
      const roundNumber = rounds.length - 1
      const currentRound = rounds[roundNumber]
      const tiles = currentRound.tiles
      let index1 = null, index2 = null // plus pos (initial index)
      let charTile = null, targetTile1 = null, targetTile2 = null
      let newCharTile = null, newTile1 = null, newTile2 = null
      // const newCharPos = null

              
      // new code for current pos
      charTile = tiles[pos]
      newCharTile = (charTile === 8) ? 2 : 0

      // new code tile 1
      index1 = this.getTargetIndex(pos, dir)
      targetTile1 = tiles[index1]
      if (targetTile1 === 4 || targetTile1 === 2) { // there was a mark there
          newTile1 = 8
      } else { // previously no mark (cases 3 or 0)
          newTile1 = 9
      }

      // if pushing box, define new target 2 code
      if (targetTile1 === 3 || targetTile1 === 4) { 
          index2 = this.getTargetIndex(index1, dir)
          targetTile2 = tiles[index2]

          if (targetTile2 === 2) {
              newTile2 = 4
          } else { // then equals to 0
              newTile2 = 3
          }
      }

      // save data

      /*
      const history = this.state.history.slice()
      const current = history[history.length - 1]
      tiles.cocurrent.tiles.slice()
      turnData.tiles[pos] = newCharTile
      turnData.tiles[index1] = newTile1
      if (index2 !== null && newTile2 !== null && newTile2 !== null)
          turnData.tiles[index2] = newTile2

      
      */

      // data to be saved
      tiles[pos] = newCharTile
      tiles[index1] = newTile1
      if (index2 !== null && newTile2 !== null && newTile2 !== null)
        tiles[index2] = newTile2

      currentRound.position = index1
      currentRound.action = dir

      // window.alert('went til the end')
      this.setState({
          history: rounds,
          moveCount: roundNumber
      })

      
  }

  getTargetIndex = (pos, dir) => {
      // acquire target tile
      const {width} =  this.state
      // window.alert(pos+1)
      switch (dir) {
          case 'ArrowUp':
              return pos-width
          case 'ArrowLeft':
              return pos-1
          case 'ArrowDown':
              return pos+width
          case 'ArrowRight':
              return pos+1
          default:
              return null
      }
  }

  isMoveLegal = (pos, dir, rounds) => {
      // const {tiles} = this.state - moved to render

      if (dir == null) return false

      const tiles = this.getCurrentRound(rounds).tiles
      
      let targetIndex = this.getTargetIndex(pos,dir)
      
      if (tiles[targetIndex] === 0 || tiles[targetIndex] === 2) {
          return true
      } else if (tiles[targetIndex] === 3 || tiles[targetIndex] === 4) { //box on the way
          targetIndex = this.getTargetIndex(targetIndex, dir)
          if (tiles[targetIndex] === 0 || tiles[targetIndex] === 2)
              return true
          else
              return false
      } else {
          return false
      }
  }

  getCurrentRound = (rounds) => {
    const numRounds = rounds.length
    return rounds[numRounds-1]
  }

  getCurrentPosition = (rounds) => {
    const pos = this.getCurrentRound(rounds).position
    // window.alert(pos)
    if (pos == null)
      return this.state.initPos
    else
      return pos
  }


  render() {

    return (
      <div id="main">
        <LevelMap game={this.state}  />
        <Keypad callback={this.actionHandler} />
      </div>
    )
  }
}

export default App;
