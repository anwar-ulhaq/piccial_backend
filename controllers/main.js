exports.getMain = (req, res, next) => {
    //console.log('signup');
    res.render('main', {
        pageTitle: 'Piccial - Food Reviews Page',
        path: '/main',
    });
}