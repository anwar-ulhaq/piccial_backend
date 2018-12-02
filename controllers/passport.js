/*
 
 @Auther Anwar on 01/12/2018.
 @Project piccial_backend
 
 */
const pasport        = require('passport');

module.exports = pasport;

/*
const User              = require('../models/users');           //To authenticate user from DB
const express           = require('express');
const passport          = require('passport');
//const passport        = require('passport');                  //Authentication handling
const LocalStrategy     = require('passport-local').Strategy;   //Authentication strategy for Passport

const app = express();
// configure passport.js to use the local strategy
const piccialStrategy = () => {
  console.log("Inside piccial Strategy function");
  passport.use(new LocalStrategy(
      (username, password, done) => {
        console.log('Inside local strategy callback. user is ' + username + ' and password is ' + password);
        // here is where you make a call to the database
        // to find the user based on their username or email address
        // for now, we'll just pretend we found that it was users[0]
        User.login(username, password)
          .then((rows) => {
            //console.log('aaa' + rows[0][0].userId);
            if (rows[0].length > 0) { //match username and password --> login

              console.log('Ngon' + rows[0][0].userId);
              User.loginManager(rows[0][0].userId) //add userId and timeLogin into table login
                  .then(() => {

                  })
                  .catch(err => console.log(err));
              return done(null,rows[0][0]);
              //return done(null, user)

            } else {
              //Failed attemped
              res.render('index', {
                pageTitle: 'Login',
                path: '/',
              });
              return done(null, false);
            }
          })
          .catch(err => console.log(err));

      }
  ));
};

const authenticate = () => {
  console.log("Inside authenticate function");

  console.log('Inside POST /login callback');
  //console.log('Inside POST /login callback');
  //passport.authenticate();
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback');
    console.log("User details" + user);
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
    console.log(`req.user: ${JSON.stringify(req.user)}`);
    req.login(user, (err) => {
      console.log('Inside req.login() callback');
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
      console.log(`req.user: ${JSON.stringify(req.user)}`);
      //return res.send('You were authenticated & logged in!\n');
    });
    //console.log(rows[0][0].permission);
    if (user.permission === 1) { // user login is admin account
      console.log("Admin");
      //req.send("Welcome Admin");
      //res.redirect('/admin/users-manage');
    } else if (user.permission === 2) { //user login is normal account
      console.log("Normal User");
      //req.send("Welcome User");
      //res.redirect('/main');
    } else {
      //show guest page...
      console.log("Guest User");
      //res.send('Welcome Guest...')
      //todo sth
    }

  })(req, res, next);

  //Later we use following line
  //passport.authenticate('local', { successRedirect: '/node/index.html', failureRedirect: '/node/login.html' }));

/*

//Following code should be moved to passport.js under Local Strategy
  const username = req.body.username;
  const password = req.body.password;

*/


};

// tell passport how to serialize the user embed
const serializeUser = () => {
  passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here');
    done(null, user.userid);
  });
};

// tell passport how to deserialize the user
const deserializeUser =() =>{
  passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback');
    console.log(`The user id passport saved in the session file store is: ${id}`);
    const user = users[0].userid === id ? users[0] : false;
    done(null, user);
  });
};

const init = () => {
  passport.initialize();
};
const session = () => {
  passport.session();
};

app.use(passport.initialize());
app.use(passport.session() );

module.exports = {
  piccialStrategy : piccialStrategy,
  authenticate    : authenticate,
  serializeUser   : serializeUser,
  deserializeUser : deserializeUser,
  init            : init,
  session         : session
};*/
