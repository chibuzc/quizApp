const express= require('express');
const mongoose = require('mongoose');
const passport = require ('passport');
const app = express();
const session = require('express-session')

app.use(session({
    secret: 'Very very random secret',
    resave: false,
    saveUninitialized: true
}))

require('./User')
require('./services/passport')


app.use(passport.initialize())
app.use(passport.session())

require('./authRoutes')(app)


app.get('/auth/google', passport.authenticate('google',
{   
scope: [ 'profile', 'email' ]
})
)

app.get('/auth/google/callback', 
passport.authenticate('google'),
(req, res) => {
    res.send("authenticated")
})
    




mongoose.connect('mongodb://localhost:27017/quiz',()=>{
    console.log('db is connected')
})


app.listen(process.env.PORT||5000,()=>{
    console.log(`server is running`)
})