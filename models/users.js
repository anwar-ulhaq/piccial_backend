const db = require('../util/databaseConnect');

module.exports = class Users {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6rtrg5owATY350Zo03V-LRi206_FA0BMJsBsMhodT4UjHO6hI';
        this.timeUpdate = new Date();
        //this.timeDelete = timeDelete;
        this.permission = 2;
        //this.fullname = fullname;
    }

    addUser() {
         return db.execute(
            'INSERT INTO users (username, password, email, avataUrl, timeUpdate, permission) VALUES (?, ?, ?, ?, ?, ?)',
            [this.username, this.password, this.email, this.avatarUrl, this.timeUpdate, this.permission]
        );
    }

    static checkUserExist(username) {
        return db.execute('SELECT username,email FROM users WHERE users.username = ?', [username]);
    }

    static login(username, password) {
        return db.execute('SELECT userId, username,password,permission FROM users WHERE users.username = ? AND users.password = ?',
            [username, password]);
    }

    static loginManager(userId) { //add userId and timeLogin in to table login
        const time = new Date();
        return db.execute(
            'INSERT INTO login (userId, timeLogin) VALUES (?, ?)',
            [userId, time]);
    }

    static checkID(userID) {
        return db.execute('SELECT userId FROM users WHERE userID =?', [userID]);
        //console.log("Database responce = " + queryResponce);
        //return queryResponce;
    }
}