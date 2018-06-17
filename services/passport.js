const passport =require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleKeys = require('./google')
mongoose = require('mongoose')
const User = mongoose.model('User')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user=> {
            done(null, user)
        })
})


passport.use(new GoogleStrategy({
    clientID: googleKeys.googleClientId,
    clientSecret: googleKeys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken)
    console.log(profile)
    const existingUser = await User.findOne({username: profile.id})
    if (existingUser){
        console.log(`1existing user`, existingUser)
        done(null, existingUser)
    }else{
        const user = await new User({username:profile.id}).save()
        console.log(user)
        done(null, user)
    }
}))