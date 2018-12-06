const db = require('../util/databaseConnect');

module.exports = class Foods{
  constructor(title,content,userId){
    this.title = title;
    this.content = content;
    this.userId = userId;
  }

  static addFood(title,content,userId){
    const timeUpdate = new Date();
    return db.execute(
        'INSERT INTO foods (title, content, timeUpdate, userId) VALUES (?, ?, ?, ?)',
        [title, content, timeUpdate, userId]
    );
  }

  static findFoodById(foodId){
    return db.execute(
        'SELECT * FROM foods WHERE foodId = ?',[foodId]
    );
  }

  static findImagesByFoodId(foodId){
    return db.execute(
        'SELECT * FROM images WHERE foodId = ? AND timeDelete IS NULL',[foodId]
    );
  }

  static fetchAllFoodInMain(){
    return db.execute(
        'SELECT * FROM foods RIGHT JOIN images ON foods.foodId = images.foodId GROUP BY foods.foodId'
    );
  }

  static foodDetail(foodId){
    return db.execute(
        'SELECT * FROM foods LEFT JOIN images ON foods.foodId = images.foodId WHERE foods.foodId = ?',[foodId]
    );
  }

  static getComments(foodId){
    return db.execute(
        'SELECT * FROM commentUser WHERE foodId = ? ORDER BY timeUpdate DESC',[foodId]
    );
  }

  static addComments(foodId, userId, content){
    const timeUpdate = new Date();
    return db.execute(
        'INSERT INTO comments (foodId, userId,timeUpdate, content) VALUES (?,?,?,?)',
        [foodId,userId,timeUpdate,content]
    );
  }

  static addLike(foodId,userId){
    const timeUpdate = new Date();
    const isLike = 1;
    return db.execute(
        'INSERT INTO likes (foodId, userId,timeUpdate, isLike) VALUES (?,?,?,?)',
        [foodId,userId,timeUpdate,isLike]
    )
  }

  static updateLike(foodId,userId){
    const timeUpdate = new Date();
    const isLike = 1;
    return db.execute(
        'UPDATE likes SET isLike = ? WHERE foodId = ? AND userId = ?',[isLike,foodId,userId]
    );
  }

  static addDislike(foodId,userId){
    const timeUpdate = new Date();
    const isLike = 0;
    return db.execute(
        'UPDATE likes SET isLike = ?  WHERE foodId = ? AND userId = ?',[isLike,foodId,userId]
    );
  }

  static checkLike(foodId,userId){
    return db.execute(
        'SELECT * FROM likes WHERE foodId = ? AND userId = ?',[foodId,userId]
    );
  }

  static checkCanLike(foodId,userId,isLike){
    return db.execute(
        'SELECT * FROM likes WHERE foodId = ? AND userId = ? AND isLike = ?',[foodId,userId,isLike]
    );
  }

  static getLikeSum(foodId){
    return db.execute(
        'SELECT * FROM likes WHERE foodId = ? AND isLike = 1',[foodId]
    );
  }


  static addImages(foodId,imageUrl,userId){
    const timeUpdate = new Date();
    return db.execute(
        'INSERT INTO images (foodId,imageUrl,timeUpdate,userId) VALUES (?,?,?,?)',
        [foodId,imageUrl,timeUpdate,userId]
    );
  }

};