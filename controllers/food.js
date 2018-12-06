const Food = require("../models/foods");
exports.getIndex = (req, res, next) => {
  res.render("index", {
    pageTitle: "Welcome to Piccial",
    path: "/"
  });
};

exports.postAddFood = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.session.user.userId;
  const images = req.files;
  //   console.log(title);
  //   console.log(content);
  //   console.log(userId);
  //   console.log(images);
  Food.addFood(title, content, userId)
  .then(results => {
    //console.log(results[0].insertId);
    images.forEach(image => {
      //console.log(image.filename);
      Food.addImages(results[0].insertId, image.filename, userId)
      .then(result => {
        res.redirect("/main");
      })
      .catch(err => {
        console.log(err);
      });
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getFoodDetail = (req, res, next) => {
  const foodId = req.query.foodId;
  //console.log(foodId);
  Food.foodDetail(foodId)
  .then(result => {
    //console.log(result[0]);
    const food = result[0];

    Food.getLikeSum(foodId)
    .then(result => {
      const like = result[0];
      let canLike = false;
      console.log(like);
      Food.checkCanLike(foodId, req.session.user.userId, 1)
      .then(result =>{

        if(result[0].length > 0) {
          canLike = false
        }else{
          canLike = true;
        }

      })
      .catch(err => {
        console.log(err);
      });

      console.log(canLike);
      Food.getComments(foodId)
      .then(comments => {
        //console.log(comments[0])
        const comment = comments[0];
        //console.log(like.length);
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
};

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
      return Food.addLike(foodId, userId)
      .then(result => {
        res.redirect(`/food-detail?foodId=${foodId}`);
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
