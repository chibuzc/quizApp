const mongoose = require('mongoose')
const {Schema} = mongoose

const quizSchema = new Schema({
    question: String,
    hint: String,
    options: [ String ],
    answer: String,
    difficultyIndex: Number
})

mongoose.model('Quiz', quizSchema)