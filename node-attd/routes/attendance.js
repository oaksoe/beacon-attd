var express = require('express');
var router = express.Router();
var httpHelper = require('../helpers/http');
var AttendanceModel = require('../models/attendance.model');
var dbEntityController = require('../controllers/dbEntityController');

var entity = 'attendance';

var create = async (req, res) => {
    try {
        var attendance = req.body;
        if (attendance) {
            var newAttendance = new AttendanceModel(attendance.studentID);
            var createdAttendance = await dbEntityController.create(entity, newAttendance);
            newAttendance.id = createdAttendance.id;
            httpHelper.res(res, createdAttendance);
        } else {
            httpHelper.err(res, 'Invalid attendance details');
        }
    } catch(err) {
        httpHelper.err(res, err);
    }
}

router.post('/create', create);

module.exports = router;
