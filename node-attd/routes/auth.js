var express = require('express');
var router = express.Router();
var httpHelper = require('../helpers/http');
var UserModel = require('../models/user.model');
var dbEntityController = require('../controllers/dbEntityController');

var entity = 'user';

var create = async (req, res) => {
    console.log('create');
    try {
        var user = req.body;
        if (user) {
            var newUser = new UserModel(user.username, user.password, user.name, user.type);
            var createdUser = await dbEntityController.create(entity, newUser);
            newUser.id = createdUser.id;
            httpHelper.res(res, createdUser);
        } else {
            httpHelper.err(res, 'Invalid user details');
        }
    } catch(err) {
        httpHelper.err(res, err);
    }
}

var login = async (req, res) => {
    var user = req.body;
    console.log('login', user);

    try {
        var result = await dbEntityController.find(entity, { _username: user.username });
        if (result.length > 0 && result[0]._password) {
            if (user.password === result[0]._password) {
                httpHelper.res(res, result[0]);
            } else {
                httpHelper.err(res, 'Invalid Password');
            }
        } else {
            httpHelper.err(res, 'Invalid Username');
        }
    } catch(err) {
        httpHelper.err(res, err);
    }
}

var users = async (req, res) => {
    console.log('users');
    var user = req.body;

    try {
        var result = await dbEntityController.find(entity);
        if (result.length > 0) {
            httpHelper.res(res, result);            
        } else {
            httpHelper.err(res, 'No Users Available');
        }
    } catch(err) {
        httpHelper.err(res, err);
    }
}

router.post('/create', create);
router.post('/login', login);
router.get('/users', users);

module.exports = router;
