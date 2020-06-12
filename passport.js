var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
const config = require('config');

module.exports = function(passport){
  passport.serializeUser((user, done)=>
    {
      done(null, user)
    });

  passport.deserializeUser((obj, done)=>
    {
      done(null, obj)
    });

    passport.use(new FacebookStrategy({
      clientID:config.Facebook.key,
      clientSecret:config.Facebook.secret,
      callbackURL:"/login/auth/facebook/callback",
      profileFields:["id", "displayName"]
    },function(accessToken, refreshToken, profile, done) {

      return done(null, profile);
    }));
    /*
    passport.use(new GithubStrategy({
      clientID:config.Github.key,
      clientSecret:config.Github.secret,
      callbackURL:"/auth/github.callback",
      profileFields:["id", "displayName"]
    }),function(accessToken, refreshToken, profile, done) {

      return done(null, profile);
    });
    */
/*
    passport.use(new GoogleStrategy({
      clientID:config.Google.key,
      clientSecret:config.Google.secret,
      callbackURL:"http://localhost:3000/login/auth/google/callback",
      passReqToCallback   : true
    },function(accessToken, refreshToken, profile, done) {

      return done(null, profile);
    }));*/
}
