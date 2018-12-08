const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    googleId: String,
    thumbnail: String,
    difficulty: String,
    score: String
});

const Score = mongoose.model('scoreModel', scoreSchema);

module.exports = Score;
