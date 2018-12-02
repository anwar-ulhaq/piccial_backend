const path = require('path');
const express           = require('express');
const bodyParser        = require('body-parser');
//Anwar
const session           = require('express-session');           //Session handling
const passport          = require('passport');                  //Authentication handling
const LocalStrategy     = require('passport-local').Strategy;   //Authentication strategy for Passport


//Routes
const usersRoutes       = require('./routes/users');
const mainRoutes        = require('./routes/main');
const adminRoutes       = require('./routes/admin');
//const pasport           = require('./controllers/passport');
const User              = require('./models/users');

passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log('Inside local strategy callback. user is ' + username + ' and password is ' + password);
      // here is where you make a call to the database
      // to find the user based on their username or email address
      // for now, we'll just pretend we found that it was users[0]
      User.login(username, password)
      .then((rows) => {
        //console.log("Query result is "+ JSON.stringify(rows));
        //console.log('aaa' + rows[0][0].userId);
        if (rows[0].length > 0) { //match username and password --> login

          console.log('UserID' + rows[0][0].userId);
          console.log('Name' + rows[0][0].username);
          console.log('password' + rows[0][0].password);
          User.loginManager(rows[0][0].userId) //add userId and timeLogin into table login
              .then(() => {

              })
              .catch(err => console.log(err));
          return done(null,{
            "userid":rows[0][0].userId,
            "username":rows[0][0].username,
            "password":rows[0][0].password,
            "permission": rows[0][0].permission
          });
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

//passport.serializeUser();
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here');
  console.log("UserID is " + user.userid);
  done(null, user.userid);
});
//passport.deserializeUser();
passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback');
  console.log(`The user id passport saved in the session file store is: ${id}`);
  //Need to ask database if this ID is existed. If yes, req.Auth become true or else false.
  User.checkID(id)
    .then( (queryResponce) => {
      //console.log(JSON.stringify(queryResponce[0]));
    //console.log(JSON.stringify(queryResponce));
    if (queryResponce[0].length > 0) {
      console.log('UserID : ' + queryResponce[0][0].userId);
      //console.log('Name' + queryResponce[0][0].username);
      //console.log('password' + queryResponce[0][0].password);
      return done(null,{
        "userid":queryResponce[0][0].userId
      });
    }
    else
    {
      return done(null, false);
    }
  }).catch(err => console.log(err));

  //const user = User.checkID(id) === id ? id : false;

  //const useer = user.userid === id ? user : false;
  //console.log("User ID of deserializeUser is " + user);
  //done(null, user);
});

const app = express();

//Use ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

//Use body-parser middleware for Text and JSON
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//  App is behind proxy server so we need to set trust proxy
//  app.set('trust proxy', 1)
app.set('trust proxy');
//Create a Session
app.use(session({
  secret            : process.env.SECRET,
  name              : process.env.COOKIE_NAME,
  resave            : false,
  saveUninitialized : true
  //cookie            : { secure  : true  }
}));

app.use(passport.initialize());
app.use(passport.session());

//set path folder public as root
//app.use(express.static(path.join(__dirname, 'Piccial---Media-Sharing-Web-Application')));

// use routes
app.use('/admin', adminRoutes);
app.use(usersRoutes);
app.use(mainRoutes);




app.listen(3000, () => {
  console.log('Listening on localhost:3000');
});

//    [[{"userId":1,"username":"testuser","password":"password","permission":2}],
//    [[{"userID":1,"username":"testuser","email":"test@test.com"}],