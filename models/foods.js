const db = require('../util/databaseConnect');

module.exports = class Foods{
    constructor(title,content,images,videos){
        this.title = title;
        this.content = content;
        this.images = images;
        this.video = videos;
    }

    addFood(){
        return db.execute(
            'INSERT INTO foods (title, content, timeUpdate) VALUES (?, ?, ?, ?, ?, ?)',
            [this.username, this.password, this.email, this.avatarUrl,this.timeUpdate,this.permission]
        );
    }

}