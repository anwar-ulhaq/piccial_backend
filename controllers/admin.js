exports.getUsersManage = (req, res, next) => {
    res.render('admin/users-manage', {
        pageTitle: 'User Manage',
        path: '/admin/users-manage',
        userExisted: false
    });
}