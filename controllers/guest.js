const User = require("../models/users");
const Food = require('../models/foods');

//Show the main form of guest
exports.getGuest = (req, res, next) => {
  User.guest()
  .then(result => {
    Food.fetchAllFoodInMain()
    .then(result => {
      const foods = result[0];
      res.render("guest", {
        pageTitle: "Piccial - Food Reviews Page",
        path: "/guest",
        user: req.session.user,
        foods: foods,
        foodOfTheDay: foods
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

//Search function in the main form of guest
exports.getGuestSearch = (req, res, next) => {
  const search = req.query.search;
  Food.foodOfTheDay().then(result =>{
    const foodOfTheDay = result[0];
    Food.search(search)
    .then(result =>{
      const foods = result[0];
      Food.getLikeSum(foods);
      res.render("guest", {
        pageTitle: "Piccial - Food Reviews Page",
        path: "/guest",
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

//Show the form food detail of guest (can not like and comment)
exports.getFoodDetailGuest = (req, res, next) => {
  const foodId = req.query.foodId;
  Food.getFoodDetailGuest(foodId).then(result =>{
    const food = result[0];
    Food.getComments(foodId).then(cm =>{
      const comment = cm[0];
      Food.findImagesByFoodId(foodId).then(images =>{
        const image = images[0];
        res.render("food-detail-guest", {
          pageTitle: "Food detail",
          path: "/food-detail-guest",
          comment: comment,
          food: food,
          image:image
        });
      }).catch(err =>{
        console.log(err);
      });

    }).catch(err =>{
      console.log(err);
    });
  }).catch(err =>{
    console.log(err);
  })
};