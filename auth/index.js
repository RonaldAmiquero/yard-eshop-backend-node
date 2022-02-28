const passport = require('passport')
const { LocalStrategy } = require('./local.strategy')
const { JwtStrategy } = require('./jwt.strategy')

passport.use(LocalStrategy)
passport.use(JwtStrategy)
