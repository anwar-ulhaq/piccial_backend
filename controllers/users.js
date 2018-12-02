const User              = require('../models/users');
const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;   //Authentication strategy for Passport


/*
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
*/

exports.getSignup = (req, res, next) => {
    //console.log('signup');
    res.render('signup', {
        pageTitle: 'Sign Up',
        path: '/signup',
        userExisted: false
    });
};

exports.postSignup = (req, res, next) => { //add user
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    User.checkUserExist(username)
        .then(rows => {
            //console.log(rows[0]);
            if (rows[0].length > 0) { //user exist
                res.render('signup', {
                    username: username,
                    pageTitle: 'Sign Up',
                    path: '/signup',
                    userExisted: true
                });
            } else { //user not exist, can add new user
                const user = new User(username, password, email);
                user.addUser().then(() => {
                        res.redirect('/');
                    })
                    .catch(err => console.log(err));
            }

        })
        .catch(err => console.log(err));

};

exports.postLogin = (req, res, next) => {
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
      res.send("Welcome Admin");
      //res.redirect('/admin/users-manage');
    } else if (user.permission === 2) { //user login is normal account
      console.log("Normal User");
      res.send("Welcome User");
      //res.redirect('/main');
    } else {
      //show guest page...
      console.log("Guest User");
      res.send('Welcome Guest...')
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

exports.getLogin = (req, res, next) => {
  console.log('Inside GET /login callback function');
  console.log(req.sessionID);
  res.send(`You got the login page!\n`);
};

exports.getIndex = (req, res, next) => {
    /*res.render('index', {
        pageTitle: 'Welcome to Piccial',
        path: '/'
    });*/
  console.log('Inside the homepage callback function');
  console.log(req.sessionID);
  res.send(`You hit home page!\n`);
};

exports.getAuth = (req, res) => {
  console.log('Inside GET /authrequired callback');
  console.log(`User authenticated? ${req.isAuthenticated()}`);
  if(req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n');
  } else {
    res.redirect('/')
  }
};
