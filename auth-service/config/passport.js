'use strict';
var passport = require('passport')
// var FacebookTokenStrategy = require('passport-facebook-token')
var FacebookTokenStrategy = require('passport-facebook-token');
var loginController=require('../controllers/Login-controller')



module.exports=()=>{
  FacebookTokenStrategy.passReqToCallback = true;
  passport.use(new FacebookTokenStrategy({
    clientID: "510658422788928",
    clientSecret: "454682a13ee1591b0310cc87686d5a2a",
    callbackURL: "http://server.icanstudioz.com:8090/auth/facebook/callback",
     passReqToCallback: true
  },
  function(req,accessToken, refreshToken, profile,done) {
    console.log("profile==>",+profile)
   loginController.facebookVeryfication(req,accessToken, refreshToken, profile,(err,user)=>{
     return done(err,user)
   })

  
  }
));



var GoogleTokenStrategy=require("passport-google-token").Strategy

passport.use(new GoogleTokenStrategy({
  clientID:"629979606962-f4is9jg06vs0dgsm5chvbicioai0jthq.apps.googleusercontent.com",
  clientSecret:"NCmjR4_dVDBDnyAKHx97JLTM" ,
   passReqToCallback: true
},
function(req,accessToken, refreshToken, profile, done) {
  console.log("profile=>",profile)
  loginController.googleVeryfication(req,accessToken, refreshToken, profile,(err,user)=>{
    return done(err,user)
  })
}
));

}
