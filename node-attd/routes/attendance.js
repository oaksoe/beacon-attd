var express = require('express');
var router = express.Router();
var httpHelper = require('../helpers/http');
var dbEntityController = require('../controllers/dbEntityController');

var entity = 'attendance';

var create = async (req, res) => {
    try {
        var attendance = req.body;
        if (attendance) {            
            var createdAttendance = await dbEntityController.create(entity, attendance);
            attendance.id = createdAttendance.id;
            httpHelper.res(res, attendance);
        } else {
            httpHelper.err(res, 'Invalid attendance details');
        }
    } catch(err) {
        httpHelper.err(res, err);
    }
}

var update = async (req, res) => {
    try {
        var attendance = req.body;
        if (attendance) {            
            await dbEntityController.update(entity, attendance, { id: attendance.id });
            httpHelper.res(res, null);
        } else {
            httpHelper.err(res, 'Invalid attendance details');
        }
    } catch(err) {
        httpHelper.err(res, err);
    }
}

var find = async (req, res) => {
    var id = req.params.id;
    
    try {
        var result = await dbEntityController.find(entity, { id: id });
        httpHelper.res(res, result.length > 0 ? result[0] : null);
    } catch(err) {
        httpHelper.err(res, err);
    }
}

var findByCriteria = async (req, res) => {
    var intake = req.params.intake;
    var intakeModule = req.params.module;
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
    var criteria = {
        intake: intake,
        module: intakeModule,
        startDate: startDate,
        endDate: endDate
    }
    
    try {
        var result = await dbEntityController.find(entity, criteria);
        httpHelper.res(res, result.length > 0 ? result[0] : null);
    } catch(err) {
        httpHelper.err(res, err);
    }
}

router.post('/create', create);
router.put('/', update);
router.get('/:id', find);
router.get('/criteria/:intake/:module/:startDate/:endDate', findByCriteria);

module.exports = router;
