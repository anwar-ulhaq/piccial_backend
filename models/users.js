const db = require('../util/databaseConnect');

module.exports = class Users {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6rtrg5owATY350Zo03V-LRi206_FA0BMJsBsMhodT4UjHO6hI';
        this.timeUpdate = new Date();
        this.timeDelete = null;
        this.permission = 2;
        //this.fullname = fullname;
    }

    addUser() {
         return db.execute(
            'INSERT INTO users (username, password, email, avataUrl, timeUpdate, permission,timeDelete) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.username, this.password, this.email, this.avatarUrl, this.timeUpdate, this.permission,this.timeDelete]
        );
    }

    static checkUserExist(username) {
        return db.execute('SELECT * FROM users WHERE users.username = ?', [username]);
    }

    static findById(userId){
        return db.execute('SELECT userId, username,email,password, permission FROM users WHERE users.userId = ?', [userId]);
    }

    static login(username) {
        return db.execute('SELECT userId, username,password,permission FROM users WHERE timeDELETE = "NULL" AND users.username = ?',[username]);
    }

    static getAllUsers(){
        return db.execute('SELECT * FROM users WHERE timeDelete IS NULL ');
    }

    static loginManager(userId) { //add userId and timeLogin in to table login
        return db.execute(
            'INSERT INTO login (userId) VALUES (?)',
            [userId]);
    }

    static deleteUser(userId){
        const timeDelete = new Date();
        return db.execute('UPDATE users SET timeDelete = ? WHERE userId = ?',[timeDelete,userId]);
    }

    static updatePermission(userId, permission){
        return db.execute('UPDATE users SET permission = ? WHERE userId = ?',[permission,userId]);
    }

    static updateLogout(userId){
        const timeLogout = new Date();
        return db.execute('UPDATE login SET timeLogout = ? WHERE userId = ? AND timeLogin IS NOT NULL',[timeLogout,userId]);
    }

    static updateAvatar(userId,avataUrl){
        const timeUpdate = new Date();
        return db.execute('UPDATE users SET avataUrl = ?, timeUpdate = ? WHERE userId = ?',[avataUrl, timeUpdate, userId]);
    }

    //guest update
    static guest(){
        const timeLogin = new Date();
        return db.execute('INSERT INTO guest (timeLogin) VALUES (?)',[timeLogin]);
    }
};