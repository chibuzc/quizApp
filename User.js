const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema ({
    username: String,
    currentScore: {type: Number, default: 0},
    multiplayer: {type:Boolean, default:false},
    connected: {type:Boolean, default:false}
})

mongoose.model('User', userSchema)