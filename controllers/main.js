const User = require("../models/users");
const bcrypt = require("bcryptjs");

//Show the form sign-up
exports.getSignup = (req, res, next) => {
  res.render("signup", {
    pageTitle: "Sign Up",
    path: "/signup",
    userExisted: false
  });
};

//When user fill and signup, check if username is exist or not
//if user not exist -> signup successful
exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  User.checkUserExist(username)
  .then(rows => {
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

//Check username and password before user login
exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  User.login(username)
  .then(rows => {
    console.log(rows[0]);
    if (rows[0].length > 0) {
      //username is correct, check password
      console.log('vvvvddd',rows[0][0]);
      bcrypt.compare(password, rows[0][0].password).then(result => {
        if (result) {
          // if password match
          req.session.isLoggedIn = true;
          rows[0][0].password = "";
          req.session.user = rows[0][0];
          User.loginManager(rows[0][0].userId) //add userId and timeLogin into table login
              .then(() => {
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

//When user click Logout button
exports.getLogout = (req, res, next) => {
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

//Show the form Profile of user (change avater/password)
exports.getUserInfoUpdate = (req, res, next) => {
  res.render("user-page", {
    pageTitle: "User info",
    path: "/user-page",
    user: req.session.user,
    check: 0
  });
};

//User change avatar
exports.postUserInfoUpdate = (req, res, next) => {
  const userId = req.session.user.userId;
  const avataUrl = req.file.filename;
  User.updateAvatar(userId, avataUrl)
  .then(result => {
    req.session.user.avataUrl = avataUrl;
    if (req.session.user.permission === 1) {
      res.redirect("/admin");
    } else {
      res.redirect("/main");
    }
  })
  .catch(err => {
    console.log(err);
  });
};

//User change password
exports.postUserPasswordUpdate = (req, res, next) => {
  const userId = req.session.user.userId;
  const currentPassword = req.body.password;
  const newPassword = req.body.newpassword;
  const confirmPassword = req.body.confpassword;
  console.log(userId, currentPassword, newPassword, confirmPassword);
  User.findById(userId)
  .then(result => {
    bcrypt
    .compare(currentPassword, result[0][0].password)
    .then(result => {
      let check = 0; //check = 1 :current password not correct ; check = 2 :new password not match ; check = 3: update password success
      if (!result) {
        //current password not correct
        res.render("user-page", {
          pageTitle: "User info",
          path: "/user-page",
          user: req.session.user,
          check: 1
        });
      } else {
        if (newPassword !== confirmPassword) {
          res.render("user-page", {
            pageTitle: "User info",
            path: "/user-page",
            user: req.session.user,
            check: 2
          });
        } else {
          return bcrypt
          .hash(newPassword, 12)
          .then(hashedPassword => {
            User.updatePassword(userId, hashedPassword)
            .then( result =>{
              res.render("user-page", {
                pageTitle: "User info",
                path: "/user-page",
                user: req.session.user,
                check: 3
              });
            })
            .catch(err => {
              console.log(err);
            });
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
  })
  .catch(err => {
    console.log(err);
  });
};

//After user change avatar/password, back to the main form
//If permission is admin -> back to admin form
//if permission is normal user -> bach to main form
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
