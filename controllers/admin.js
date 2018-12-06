const User = require("../models/users");
exports.getUsersManage = (req, res, next) => {
  if(req.session.user.permission === 1){
    User.getAllUsers()
    .then(data => {
      //console.log("fffffff", data[0]);
      res.render("user-manager", {
        pageTitle: "User Manager",
        path: "/user-manager",
        userExisted: false,
        data: data[0]
      });
    })
    .catch(err => {
      console.log(err);
    });
  }else{
    res.redirect('/main');
  }
  
};

exports.postUserDelete = (req, res, next) => {
  const userId = req.body.userId;
  User.deleteUser(userId)
    .then(result => {
      res.redirect("/user-manager");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postUserUpdatePermission = (req, res, next) => {
  const userId = req.body.userId;
  const permission = req.body.permission;
  //console.log('per', permission, 'userid',userId);
  User.updatePermission(userId, permission)
    .then(result => {
        res.redirect("/user-manager");
      })
    .catch(err => {
      console.log(err);
    });
};

exports.getAdmin = (req,res,next) =>{
  if(req.session.user.permission === 1){
    res.render("admin", {
      pageTitle: "Piccial - Admin permission",
      path: "/admin",
      user: req.session.user
    });
  }else{
    res.redirect('/main');
  }

};
