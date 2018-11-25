const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

//Google Strategy
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        console.log("Reached the callback");
        //console.log(profile);
        User.findOne({socialId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                //console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                  socialId: profile.id,
                  firstName: profile.name.givenName,
                  middleName: profile.name.middleName,
                  lastName: profile.name.familyName,
                  gender: profile.gender,
                  profileUrl: profile._json.url,
                  email: profile.emails[0].value,
                  thumbnail: profile.photos[0].value,
                  platform: 'Google'
                }).save().then((newUser) => {
                    //console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);


//Facebook strategy
passport.use(new FacebookStrategy({
    clientID: keys.facebook.appID,
    clientSecret: keys.facebook.appSecret,
    callbackURL: "http://www.thehocket.com/auth/facebook/callback",
    profileFields   : ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'photos'],
  },
  function(accessToken, refreshToken, profile, done) {
    // check if user already exists in our own db

    //console.log(profile);
    User.findOne({socialId: profile.id}).then((currentUser) => {
        if(currentUser){
          // already have this user
          //console.log('User exists');
          //console.log('user is: ', currentUser);
          done(null, currentUser);
        } else {
            // if not, create user in our db
            console.log('User doesnt exists');
            new User({
              socialId: profile.id,
              firstName: profile.name.givenName,
              middleName: profile.name.middleName,
              lastName: profile.name.familyName,
              gender: profile.gender,
              profileUrl: profile.profileUrl,
              email: profile._json.email,
              thumbnail: profile.photos[0].value,
              platform: 'Facebook'
            }).save().then((newUser) => {
                //console.log('created new user: ', newUser);
                done(null, newUser);
            });
        }
    });
  }
));
