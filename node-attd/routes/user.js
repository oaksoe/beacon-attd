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
        httpHelper.res(res, result.length > 0 ? result[0] : null);
    } catch(err) {
        httpHelper.err(res, err);
    }
}

var findAll = async (req, res) => {
    try {
        var result = await dbEntityController.find(entity, {});
        httpHelper.res(res, result);
    } catch(err) {
        httpHelper.err(res, err);
    }
}

var findStudentsByCriteria = async (req, res) => {
    var intake = req.params.intake;
    var intakeModule = req.params.module;
    var criteria = {
        role: 'STUDENT',
        intake: intake,
        modules: intakeModule
    }

    try {
        var result = await dbEntityController.find(entity, criteria);
        httpHelper.res(res, result);
    } catch(err) {
        httpHelper.err(res, err);
    }
}

router.post('/create', create);
router.post('/createAll', createAll);
router.get('/:username', find);
router.get('/', findAll);
router.get('/students/:intake/:module', findStudentsByCriteria)

module.exports = router;
