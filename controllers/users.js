

const User = require("../models/users");
const bcrypt = require("bcryptjs");


exports.getSignup = (req, res, next) => {
  //console.log('signup');
  res.render("signup", {
    pageTitle: "Sign Up",
    path: "/signup",
    userExisted: false
  });
};

exports.postSignup = (req, res, next) => {
  //add user
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  User.checkUserExist(username)
  .then(rows => {
    //console.log(rows[0]);
    if (rows[0].length > 0) {
      //user exist
      res.render("signup", {
        username: username,
        pageTitle: "Sign Up",
        path: "/signup",
        userExisted: true
      });
    } else {
      //user not exist, can add new user
      return bcrypt.hash(password, 12).then(hashedPassword => {
        const user = new User(username, hashedPassword, email);
        user
        .addUser()
        .then(() => {
          res.redirect("/");
        })
        .catch(err => console.log(err));
      });
    }
  })
  .catch(err => console.log(err));
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  User.checkUserExist(username)
  .then(rows => {
    //console.log('aaaa',rows[0][0].username);
    console.log(rows[0]);
    if (rows[0].length > 0) {
      //username is correct, check password
      // console.log(password)
      // console.log(rows[0][0].password);

      bcrypt.compare(password, rows[0][0].password).then(result => {
        //console.log(result);
        if (result) {
          // if password match
          //console.log(result);
          //console.log(rows[0][0].userId);
          req.session.isLoggedIn = true;
          rows[0][0].password = '';
          req.session.user = rows[0][0];
          User.loginManager(rows[0][0].userId) //add userId and timeLogin into table login
              .then(() => {
                //console.log(rows[0][0].permission);
                if (rows[0][0].permission === 1) {
                  // user login is admin account
                  res.redirect("/user-manager");
                } else if (rows[0][0].permission === 2) {
                  //user login is normal account
                  res.redirect("/main");
                } else {
                  //todo sth
                }
              })
              .catch(err => console.log(err));
        } else {
          res.render("index", {
            pageTitle: "Welcome to Piccial",
            path: "/",
            loginPassed: false
          });
        }
      });
    } else {
      res.render("index", {
        pageTitle: "Login",
        path: "/",
        loginPassed: false
      });
    }
  })
  .catch(err => console.log(err));
};

exports.getLogout = (req, res, next) => {
  // console.log("logout");
  // console.log(req.session.user.userId);
  User.updateLogout(req.session.user.userId)
  .then(result => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect("/");
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getUserInfoUpdate = (req, res, next) => {
  res.render("user-page", {
    pageTitle: "User infor",
    path: "/user-page",
    user: req.session.user
  });
};

exports.postUserInfoUpdate = (req, res, next) => {
  const userId = req.session.user.userId;
  const avataUrl = req.file.filename;
  //console.log(avataUrl);
  User.updateAvatar(userId, avataUrl)
  .then(result => {
    req.session.user.avataUrl = avataUrl;
    if (req.session.user.permission === 1) {
      res.render("admin", {
        pageTitle: "Piccial - Admin Permission",
        path: "/admin",
        user: req.session.user
      });
    } else {
      /* res.render("main", {
        pageTitle: "Piccial - User Permission",
        path: "/main",
        user: req.session.user
      }); */
      res.redirect('/main');
    }

  })
  .catch(err => {
    console.log(err);
  });
};

exports.getIndex = (req, res, next) => {
  if (req.session.isLoggedIn === true) {
    if (req.session.user.permission === 1) {
      res.redirect("/admin");
    } else {
      res.redirect("/main");
    }
  } else {
    res.render("index", {
      pageTitle: "Welcome to Piccial",
      path: "/",
      loginPassed: true
    });
  }
};
