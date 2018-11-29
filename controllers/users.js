const User = require('../models/users');

exports.getSignup = (req, res, next) => {
    //console.log('signup');
    res.render('signup', {
        pageTitle: 'Sign Up',
        path: '/signup',
        userExisted: false
    });
}

exports.postSignup = (req, res, next) => { //add user
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    User.checkUserExist(username)
        .then(rows => {
            //console.log(rows[0]);
            if (rows[0].length > 0) { //user exist
                res.render('signup', {
                    username: username,
                    pageTitle: 'Sign Up',
                    path: '/signup',
                    userExisted: true
                });
            } else { //user not exist, can add new user
                const user = new User(username, password, email);
                user.addUser().then(() => {
                        res.redirect('/');
                    })
                    .catch(err => console.log(err));
            }

        })
        .catch(err => console.log(err));

}

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.login(username, password)
        .then((rows) => {
            //console.log('aaa' + rows[0][0].userId);
            if (rows[0].length > 0) { //match username and password --> login
                console.log('Ngon' + rows[0][0].userId);
                User.loginManager(rows[0][0].userId) //add userId and timeLogin into table login
                    .then(() => {
                        //console.log(rows[0][0].permission);
                        if (rows[0][0].permission === 1) { // user login is admin account
                            res.redirect('/admin/users-manage');
                        } else if (rows[0][0].permission === 2) { //user login is normal account
                            res.redirect('/main');
                        } else {
                            //todo sth
                        }

                    })
                    .catch(err => console.log(err));

            } else {
                res.render('index', {
                    pageTitle: 'Login',
                    path: '/',
                });
            }
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Welcome to Piccial',
        path: '/'
    });
}