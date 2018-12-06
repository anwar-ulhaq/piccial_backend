/*
 
 @Auther Anwar on 03/12/2018.
 @Project piccial_backend
 
 */

const db = require('../util/databaseConnect');
//const resize = require('../util/resize');
const exif = require('../util/exif');

module.exports = class Media {
  constructor(filename, filesize, title, description, mediaType) {
    this.filename = filename;
    this.filesize = filesize;
    this.title = title;
    this.description = description;
    this.mediaType = mediaType;
    this.timeAdded = new Date();
    this.timeUpdate = new Date();

  };

  addMedia(filename, filesize, title, description, mediaType) {
    /*resize.doResize(req.file.path, 300,
        './public/thumbs/' + req.file.filename + '_thumb', next);
    resize.doResize(req.file.path, 640,
        './public/medium/' + req.file.filename + '_medium', next);
    return db.execute(
        'INSERT INTO media (filename, filesize,title, description, mediaType, timeAdded, timeUpdate) VALUES (?,?,?,?,?,?,?)',
        [filename, filesize, title, description, this.mediaType, this.timeAdded, this.timeUpdate]

        //Console

    );*/
    console.log("Database add media executed");
    console.log(filename);
    console.log(filesize);
    console.log(title);
    console.log(description);
    console.log(mediaType);
    console.log("exiting Database");
  };

  getAllUserMedia(){

  };

};