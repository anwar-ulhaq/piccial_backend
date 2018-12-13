# Piccial - Media sharing app

This is a food related media sharing web application where food reviews can be seen. Only signed user can add a food post, like, and post comments on food. App is designed using NodeJS and MariaDB is used for database.

![App Poster](/poster/App_Poster.png)

## Getting Started

Following instructions will get you a copy of the project up and running on your local Linux/Mac machine (Use Cygwin for Windows) for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Setup a Database (MySQL or MariaDB).
* Install NodeJS.
* Setup a Apache web server (for live system only)

### Installing

* Download or Clone repo.
* Goto download or clone location and rename .env-example file to .env (Its a hidden file).
* Make the require changes in .env file. (SECTER and COOKIE_NAME are use only for live system).
* Create a database using Database-for-piccial.txt
* Comment following lines from app.js file as these are used on live system
  * at line 58
```
//cookie : { secure  : true  }
```
  * All the lines from line 98 to 108
```
/*
http.createServer((req, res) => {
  const redir = 'https://' + req.headers.host + req.url;
  console.log(redir);
  res.writeHead(301, { 'Location': redir });
  res.end();
}).listen(8000 ,() => {
  console.log('HTTP Listening on localhost:8000');
});
https.createServer(options, app).listen(3000 ,() => {
  console.log('HTTPS Listening on localhost:3000');
});
*/
```
  * Comment out line 110

```
app.listen(3000);
```

## Running

* At the root of project, execute following command to install all dependencies.

```
npm install
```

* Once all dependencies are installed, execute following command

```
node app.js
```
* Open web browser and goto http://localhost:3000 to see app running.


## Deployment

Following should be taken care of when deploying this on a live system.

* Set up an SSL secured webserver with redirection.
* Do not change any thing in app.js as instructed above under Installation.
* Check all dependencies (NodeJS modules) for vulnerabilitis as some of them are not recommended for live system.

## List of Dependencies

1. path
2. express
3. body-parser
4. express-session
5. express-mysql-session
6. multer
7. csurf
8. fs
9. https
10. http
11. bcryptjs
12. dotenv
13. ejs
14. mysql2
15. nodemon (Optional)


