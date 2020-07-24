const PORT = 5000

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/sokoban', {useNewUrlParser: true, useUnifiedTopology: true})
const conn =  mongoose.connection

conn.once('open', function () {
    console.log('Connected.')
})

conn.on('error', function (error) {
    console.log(error)
})


const Level =  require("./models/levels")
const Game =  require("./models/games")

app.get('/load/:uuid', (req, res) => {

    console.log('get happened')
    // get uuid and check for any matching records in games collection
    // const uuid = req.body.uuid

    // if any record is found, return the level immediatly after the one found in the records

    // TODO - for test purposes the first step will be ignore and we are sending the first level
    const uuid = req.params.uuid
    console.log(`uuid: ${uuid}`)

    let lastLevelFound = 0

    Level.findOne({levelSeq: ++lastLevelFound}, function (err, obj) {
        if (err) {
            return console.log(err)
        }
        res.send(obj)
    })


}) 

app.post('/pass', async (req, res) => {
    // validate level played
    // if the level played is valid: save record in games and load next level

    console.log(req.body)
    const {uuid, levelSeq} = req.body

    const currentLevel = await Level.findOne({levelSeq: levelSeq})
    
    // const levels = await Level.find({levelSeq: levelSeq})
    // .where('levelSeq').equals(levelSeq).or([levelSeq+1])

    // const game = new Game({
    //     uuid: uuid,
    //     level: currentLevel
    // })

    // const savedGame = await game.save()
    // if (game === savedGame)
    //     console.log('saved')

    const nextLevel = await Level.findOne({levelSeq: levelSeq+1})
    console.log(nextLevel)
    res.send(nextLevel)

}) 




app.listen(PORT, () => console.log(`Listening at http://127.0.0.1:${PORT}`))