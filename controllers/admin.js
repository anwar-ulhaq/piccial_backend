const User = require("../models/users");
const Food = require("../models/foods");
const dateFormat = require("./dateFormat");

exports.getUsersManage = (req, res, next) => {
  if (req.session.user.permission === 1) {
    User.getAllUsers()
      .then(data => {
        //const date = dateFormat.dateFormat(data[0][0].timeLogin);
        res.render("user-manager", {
          pageTitle: "User Manager",
          path: "/user-manager",
          userExisted: false,
          data: data[0],
          //date: date
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.redirect("/main");
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

exports.getAdmin = (req, res, next) => {
  if (req.session.user.permission === 1) {
    Food.fetchAllFoodInMain()
      .then(result => {
        //console.log(result[0]);
        const foods = result[0];
        Food.getLikeSum(foods);
        res.render("admin", {
          pageTitle: "Piccial - Food Reviews Page",
          path: "/admin",
          user: req.session.user,
          foods: foods,
          foodOfTheDay: foods
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.redirect("/main");
  }
};

exports.getAdminSearch = (req, res, next) => {
  const search = req.query.search;
  //console.log(search);
  Food.foodOfTheDay().then(result =>{
    //console.log(result[0]);
    const foodOfTheDay = result[0];
    Food.search(search)
    .then(result =>{
      const foods = result[0];
      Food.getLikeSum(foods);
      res.render("admin", {
        pageTitle: "Piccial - Food Reviews Page",
        path: "/admin",
        user: req.session.user,
        foods: foods,
        foodOfTheDay : foodOfTheDay
      });
    }) 
    .catch(err => {
      console.log(err); 
    });
  }).catch(err =>{
    console.log(err);
  });
  
};

exports.getFoodDetailAdmin = (req, res, next) => {
  const foodId = req.query.foodId;
  //console.log(foodId);
  Food.foodDetail(foodId)
    .then(result => {
      //console.log(result[0]);
      const food = result[0];
      //console.log('kkkkk',food)
      const date = dateFormat.dateFormat(food[0].timeUpdate.toString());
      Food.getLikeSum(foodId)
        .then(result => {
          const like = result[0];
          let canLike = false;
          //console.log(like);
          Food.updateNumLike(foodId, like.length)
            .then()
            .catch();
          Food.checkCanLike(foodId, req.session.user.userId, 1)
            .then(result => {
              if (result[0].length > 0) {
                canLike = false;
              } else {
                canLike = true;
              }
            })
            .catch(err => {
              console.log(err);
            });

          //console.log(canLike);
          Food.getComments(foodId)
            .then(comments => {
              //console.log(comments[0])
              const comment = comments[0];
              //console.log(like.length);

              Food.updateNumComm(foodId, comment.length)
                .then()
                .catch();
              const date = dateFormat.dateFormat(food[0].timeUpdate);
              res.render("food-detail-admin", {
                pageTitle: "Food detail",
                path: "/food-detail-admin",
                comment: comment,
                user: req.session.user,
                food: food,
                like: like,
                date: date,
                canLike: canLike
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postComment = (req, res, next) => {
  const foodId = req.body.foodId;
  const userId = req.session.user.userId;
  const comment = req.body.comment;
  //console.log(foodId, userId, comment);
  Food.addComments(foodId, userId, comment)
    .then(result => {
      res.redirect(`/food-detail-admin?foodId=${foodId}`);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getLike = (req, res, next) => {
  const foodId = req.query.foodId;
  const userId = req.session.user.userId;
  Food.checkLike(foodId, userId)
    .then(result => {
      //console.log(result[0]);
      let check = result[0];

      //console.log(check.length === 0);
      if (check.length === 0) {
        // neu chua co like thi
        //not like yet
        //console.log('like')
        return Food.addLike(foodId, userId, 1)
          .then(result => {
            //console.log(result);

            res.redirect(`/food-detail-admin?foodId=${foodId}`);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        //update dislike
        //console.log('check like',check[0]);
        if (check[0].isLike == 0) {
          return Food.updateLike(foodId, userId)
            .then(result => {
              res.redirect(`/food-detail-admin?foodId=${foodId}`);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return Food.addDislike(foodId, userId)
            .then(result => {
              res.redirect(`/food-detail-admin?foodId=${foodId}`);
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
};

exports.getDeleteComment = (req, res, next) => {
  const foodId = req.query.foodId;
  const commentId = req.query.commentId;
  //console.log(commentId,foodId);
  Food.deleteComments(commentId)
    .then(result => {
      res.redirect(`/food-detail-admin?foodId=${foodId}`);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getDeleteFood = (req, res, next) => {
  const foodId = req.query.foodId;
  //console.log(foodId);
  Food.deleteFood(foodId)
    .then(result => {
      res.redirect("/admin");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getUserManagerSearch = (req, res, next) => {
  const search = req.query.search;
  //console.log(search);
  User.search(search)
    .then(result =>{
      //console.log(result[0]);
     
       //const date = dateFormat.dateFormat(result[0][0].timeLogin);
      
      
      res.render("user-manager", {
        pageTitle: "User Manager",
        path: "/user-manager",
        userExisted: false,
        data: result[0],
        //date: date
      });
    })
    .catch(err => {
      console.log(err);
    });
};