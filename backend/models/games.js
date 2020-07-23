const mongoose = require('mongoose')

const gamesSchema = new mongoose.Schema({
    player: String,
    level: {type: mongoose.Types.ObjectId, ref: 'Level'},
    startTime: Date,
    endTime: Date,
    moveCount: Number,
    moves: Array,
    history: Array
})

const Game = mongoose.model('Game', gamesSchema)

module.exports = Game