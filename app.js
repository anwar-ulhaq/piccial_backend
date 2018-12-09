require("dotenv").config();
const path                      = require("path");
const express                   = require("express");
const bodyParser                = require("body-parser");
const session                   = require("express-session");
const MySQLStore                = require("express-mysql-session")(session);
const User                      = require("./models/users");
const multer                    = require('multer');
const csrf                      = require('csurf');
const fs                        = require('fs');                        //File handler
const https                     = require('https');                     //
const http                      = require('http');

//Router
const usersRoutes               = require("./routes/users");
const mainRoutes                = require("./routes/main");
const adminRoutes               = require("./routes/admin");
const guestRoutes               = require('./routes/guest');
//const mediaRoutes               = require('./routes/media');
const foodRoutes                = require('./routes/food');

const app           = express();

const store         = new MySQLStore({
  host                          : process.env.DB_HOST,
  user                          : process.env.DB_USER,
  database                      : process.env.DB_NAME,
  password                      : process.env.DB_PASS
});

const csrfProtection = csrf();

//Use ejs
app.set("view engine", "ejs");
app.set("views", "views");

//Use body-parser
app.use(
    bodyParser.urlencoded({
    extended                    : false
  })
);



//set path folder public as root
app.use(express.static(path.join(__dirname, "public")));

//session
app.set('trust proxy');
app.use(
  session({
    secret                      : process.env.SECRET,
    name                        : process.env.COOKIE_NAME,
    resave                      : false,
    saveUninitialized           : false,
    store: store,
    cookie                      : { secure  : true  }
  })
);

//app.use(csrfProtection);

app.use((req, res, next) => {
  //console.log(req.session.user);
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user.userId)
    .then(user => {
      //console.log(user[0][0]);
      req.user = user[0][0];
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  //res.locals.csrfToken = req.csrfToken();
  next();
});



// use routes
app.use(adminRoutes);
app.use(usersRoutes);
app.use(mainRoutes);
app.use(guestRoutes);
//app.use(mediaRoutes);
app.use(foodRoutes);

//app.listen(3000);

//  Key and Certificate file for use with Https
const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');

const options = {
  key                             : sslkey,
  cert                            : sslcert
};

http.createServer((req, res) => {
  const redir = 'https://' + req.headers.host + req.url;
  console.log(redir);
  res.writeHead(301, { 'Location': redir });
  res.end();
}).listen(8000 ,() => {
  console.log('HTTP Listening on localhost:8000');
});
https.createServer(options, app).listen(3000 ,() => {
  console.log('HTTPS Listening on localhost:3000');
});

