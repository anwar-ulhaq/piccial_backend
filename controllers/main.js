const Food = require("../models/foods");

exports.getMain = (req, res, next) => {
  Food.fetchAllFoodInMain()
    .then(result => {
      //console.log(result[0]);
      const foods = result[0];
      Food.getLikeSum(foods);
      res.render("main", {
        pageTitle: "Piccial - Food Reviews Page",
        path: "/main",
        user: req.session.user,
        foods: foods,
        foodOfTheDay: foods
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getMainSearch = (req, res, next) => {
  const search = req.query.search;
  //console.log(search);
  Food.foodOfTheDay().then(result =>{
    //console.log(result[0]);
    const foodOfTheDay = result[0];
    Food.search(search)
    .then(result =>{
      const foods = result[0];
      Food.getLikeSum(foods);
      res.render("main", {
        pageTitle: "Piccial - Food Reviews Page",
        path: "/main",
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