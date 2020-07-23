const mongoose = require('mongoose')

const levelsSchema = new mongoose.Schema({
    width: Number,
    height: Number,
    initPos: Number,
    totalGoals: Number,
    levelSeq: Number,
    solutionHash: String,
    source: String,
    originId: String,
    tiles: Array
})

const Level = mongoose.model('Level', levelsSchema)

module.exports = Level