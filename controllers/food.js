const Food = require("../models/foods");

//Index --> login form
exports.getIndex = (req, res, next) => {
  res.render("index", {
    pageTitle: "Welcome to Piccial",
    path: "/"
  });
};

//User add food
exports.postAddFood = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.session.user.userId;
  const images = req.files;
  Food.addFood(title, content, userId)
  .then(results => {
    images.forEach(image => {
      let img = "resized-" + image.filename;
      Food.addImages(results[0].insertId, img, userId)
      .then(result => {})
      .catch(err => {
        console.log(err);
      });
    });
    res.redirect("/main");
  })
  .catch(err => {
    console.log(err);
  });
};

//Show the form Food detail: title, content, images, likes, comments,...
exports.getFoodDetail = (req, res, next) => {
  const foodId = req.query.foodId;
  Food.foodDetail(foodId)
  .then(result => {
    const food = result[0];
    Food.getLikeSum(foodId)
    .then(result => {
      const like = result[0];
      let canLike = false;
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
        Food.getComments(foodId)
        .then(comments => {
          const comment = comments[0];
          Food.updateNumComm(foodId, comment.length)
          .then()
          .catch();
          res.render("food-detail", {
            pageTitle: "Food detail",
            path: "/food-detail",
            comment: comment,
            user: req.session.user,
            food: food,
            like: like,
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
  })
  .catch(err => {
    console.log(err);
  });
};

//Post comment of the food with account is loged in
exports.postComment = (req, res, next) => {
  const foodId = req.body.foodId;
  const userId = req.session.user.userId;
  const comment = req.body.comment;
  Food.addComments(foodId, userId, comment)
  .then(result => {
    res.redirect(`/food-detail?foodId=${foodId}`);
  })
  .catch(err => {
    console.log(err);
  });
};

//Check like: if login user already liked then not like more, if click like again --> dislike
//Count number of likes and show
exports.getLike = (req, res, next) => {
  const foodId = req.query.foodId;
  const userId = req.session.user.userId;
  Food.checkLike(foodId, userId)
  .then(result => {
    let check = result[0];
    if (check.length === 0) {
      return Food.addLike(foodId, userId, 1)
      .then(result => {
        res.redirect(`/food-detail?foodId=${foodId}`);
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      if (check[0].isLike == 0) {
        return Food.updateLike(foodId, userId)
        .then(result => {
          res.redirect(`/food-detail?foodId=${foodId}`);
        })
        .catch(err => {
          console.log(err);
        });
      } else {
        return Food.addDislike(foodId, userId)
        .then(result => {
          res.redirect(`/food-detail?foodId=${foodId}`);
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
