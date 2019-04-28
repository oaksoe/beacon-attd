var express = require('express');
var router = express.Router();
var httpHelper = require('../helpers/http');
var dbEntityController = require('../controllers/dbEntityController');

var entity = 'user';

var create = async (req, res) => {
    try {
        var user = req.body;
        if (user) {
            var createdUser = await dbEntityController.create(entity, user);
            user.id = createdUser.id;
            httpHelper.res(res, user);
        } else {
            httpHelper.err(res, 'Invalid user details');
        }
    } catch(err) {
        httpHelper.err(res, err);
    }
}

var createAll = async (req, res) => {
    try {
        var users = req.body;
        if (users && users.length > 0) {
            var newUsers = [];
            for (var i = 0; i < users.length; i++) {
                var newUser = await dbEntityController.create(entity, users[i]);
                newUsers.push(newUser);
            }
            httpHelper.res(res, newUsers);
        } else {
            httpHelper.err(res, 'Invalid or empty users.');
        }
    } catch(err) {
        httpHelper.err(res, err);
    }
}

var find = async (req, res) => {
    var username = req.params.username;
    
    try {
        var result = await dbEntityController.find(entity, { username: username });
        http.res(res, result.length > 0 ? result[0] : null);
    } catch(err) {
        http.err(res, err);
    }
}

var findAll = async (req, res) => {
    try {
        var result = await dbEntityController.find(entity, {});
        http.res(res, result);
    } catch(err) {
        http.err(res, err);
    }
}

router.post('/create', create);
router.post('/createAll', createAll);
router.get('/:username', find);
router.get('/', findAll);

module.exports = router;
