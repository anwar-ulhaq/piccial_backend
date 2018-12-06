const User = require("../models/users");
exports.getGuest = (req, res, next) => {
  //console.log('signup');
  User.guest()
    .then( result => {
        res.render("guest", {
            pageTitle: "Welcome to Piccial",
            path: "/guest"
          });
    })
    .catch(err => {
      console.log(err);
    });

};
