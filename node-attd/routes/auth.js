var express = require('express');
var router = express.Router();
var httpHelper = require('../helpers/http');
var dbEntityController = require('../controllers/dbEntityController');

var entity = 'user';

var login = async (req, res) => {
    var user = req.body;

    try {
        var result = await dbEntityController.find(entity, { username: user.username });
        if (result.length > 0 && result[0].password) {
            if (user.password === result[0].password) {
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

router.post('/login', login);

module.exports = router;
