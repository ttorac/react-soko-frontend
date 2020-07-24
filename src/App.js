import React from 'react'
import LevelMap from './LevelMap'
import Keypad from './Keypad'
import Scoreboard from './Scoreboard'
import './App.css'
import { TileEnum, tileMap } from './Tiles'
import {v4 as uuidv4} from 'uuid'

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
            1,0,3,0,0,2,0,1,
            1,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,9,0,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,1
            ],
            action: null,
            position: null // initial position
        }
    ],
    ready: false,
    level: null,
    width: 8,
    height: 8,
    initPos: 41,
    totalFits: 0,
    fitCount: 0,
    moveCount: 0,
    moves: []
  }

  actionHandler = (action) => {
    // let {action} = this.props

    // // get data
    const {history} = this.state
    const histCopy = history.slice()
    const currentRound = this.getCurrentRound(histCopy)
    const tilesCopy = currentRound.tiles.slice()

    const objRounds = histCopy.concat([{tiles: tilesCopy, action: currentRound.action, position: currentRound.position}])
    
    // AUDIT - this may need to be audit by someone more experienced

    this.doAction(action, objRounds)
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

      // data to be saved
      tiles[pos] = newCharTile
      tiles[index1] = newTile1
      if (index2 !== null && newTile2 !== null)
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
          if (tiles[targetIndex] === 0 || tiles[targetIndex] === 2) // TODO- review this part
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

  isLevelCompleted = () => {
    const {history} = this.state
    const tiles = this.getCurrentRound(history).tiles
    // console.log(tiles)

    // simplest way - temporary
    for (const element of tiles) {
      // console.log(element)
      if (element === 2 || element === 3 || element === 8)
        return false 
    }
    return true
  }

  initSetup = () => {
    const storage = window.localStorage
    let uuid = storage.getItem('uuid')
    
    if (!uuid) {
      uuid = uuidv4()
      storage.setItem('uuid', uuid)
    }

    window.fetch(`http://localhost:5000/load/${uuid}`)
      .then(res => res.json())
      .then(data => this.populate(data))
  }

  populate = (data) => {
    console.log(data)
    this.setState({
      history: [
          {
              tiles: data.tiles,
              action: null,
              position: null // initial position
          }
      ],
      level: data.levelSeq,
      width: data.width,
      height: data.height,
      initPos: data.initPos,
      totalFits: data.totalGoals,
      fitCount: 0,
      moveCount: 0,
      moves: []
    })
  }

  advance = async () => {
    console.log(
      JSON.stringify({ 
        uuid: window.localStorage.getItem('uuid'),
        levelSeq: this.state.level
      })
    )
    // fetch  
    const response = await window.fetch('http://localhost:5000/pass', {
      method: 'POST',
      // mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        uuid: window.localStorage.getItem('uuid'),
        levelSeq: this.state.level
      }) // body data type must match "Content-Type" header
    });

    // return 
    return response.json(); // parses JSON response into native JavaScript objects
  }

  componentDidMount() {
    this.initSetup()
  }

  componentDidUpdate() {
    if (this.isLevelCompleted()) this.advance().then(data => this.populate(data))
  }

  render() {
    const score = {
      level: this.state.level,
      lastMove: null,
      moveCount: this.state.moveCount,
      moves: this.state.moves
    }

    return (
      <div id="main">
        <LevelMap game={this.state}  />
        <Keypad callback={this.actionHandler} lock={this.isLevelCompleted()} />
        <Scoreboard score={score} />
      </div>
    )
  }
}

export default App;