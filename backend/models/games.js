const mongoose = require('mongoose')

const gamesSchema = new mongoose.Schema({
    uuid: {type: String, required: true},
    level: {type: mongoose.Types.ObjectId, required: true, ref: 'Level'},
    startTime: Date,
    endTime: Date,
    moveCount: Number,
    moves: Array,
    history: Array
})

const Game = mongoose.model('Game', gamesSchema)

module.exports = Game