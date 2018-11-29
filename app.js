const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//Router 
const usersRoutes = require('./routes/users');
const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');

const app = express();

//Use ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

//Use body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));

//set path folder public as root
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/admin', adminRoutes);
app.use(usersRoutes);
app.use(mainRoutes);


app.listen(3000);