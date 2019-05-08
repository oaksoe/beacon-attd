var express = require('express');
var router = express.Router();
var httpHelper = require('../helpers/http');
var dbEntityController = require('../controllers/dbEntityController');
var constants = require('../helpers/constants');

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

var updateFromBeacon = async (req, res) => {
    try {
        var id = req.body.id;
        var studentID = req.body.studentID;
        
        var attendance = await dbEntityController.find(entity, { id: id });
        if (attendance && attendance.length > 0) {
            attendance = attendance[0];
            for (var i = 0; i < attendance.logs.length; i++) {
                if (attendance.logs[i].studentID === studentID) {
                    attendance.logs[i].status = constants.ATTDENDANCE_STATUS.PRESENT;
                    attendance.logs[i].presencePercent = 100;
                    break;
                }
            }
            await dbEntityController.update(entity, attendance, { id: id });
            console.log('attd updated!');
            httpHelper.res(res, null);
        } else {
            httpHelper.err(res, 'Attendance record does not exist!');
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

var findSummary = async (req, res) => {
    var intake = req.params.intake;
    var intakeModule = req.params.module;
    var studentID = req.params.studentID;
    var criteria = {
        intake: intake
    }
    
    try {
        var modules = intakeModule.split(',');
        
        if (modules.length > 0) {
            var modulesSummary = [];

            for (var i = 0; i < modules.length; i++) {
                criteria.module = modules[i];
                var lectures = await dbEntityController.find(entity, criteria);

                var moduleSummary = {
                    module: modules[i],
                    attendancePercent: 0,
                    unmarkedCount: 0,
                    presentCount: 0,
                    absentCount: 0,
                    lateCount: 0
                };

                for (var j = 0; j < lectures.length; j++) {
                    for (var k = 0; k < lectures[j].logs.length; k++) {
                        var log = lectures[j].logs[k];

                        if (log.studentID === studentID) {
                            moduleSummary.attendancePercent += log.presencePercent;

                            switch(log.status) {
                                case constants.ATTDENDANCE_STATUS.UNMARKED:
                                    moduleSummary.unmarkedCount++;
                                    break;
                                case constants.ATTDENDANCE_STATUS.PRESENT:
                                    moduleSummary.presentCount++;
                                    break;
                                case constants.ATTDENDANCE_STATUS.ABSENT:
                                    moduleSummary.absentCount++;
                                    break;
                                case constants.ATTDENDANCE_STATUS.LATE:
                                    moduleSummary.lateCount++;
                                    break;
                            }

                            break;
                        }
                    }
                }

                if (lectures.length > 1) {
                    moduleSummary.attendancePercent = moduleSummary.attendancePercent / lectures.length;
                }

                modulesSummary.push(moduleSummary);
            }

            httpHelper.res(res, modulesSummary);
        } else {
            httpHelper.err(res, 'No modules');
        }
    } catch(err) {
        httpHelper.err(res, err);
    }
}

var findDailyLectures = async (req, res) => {
    try {
        var studentID = req.params.studentID;
        var intake = req.params.intake;
        var today = new Date();
        
        var attendanceList = await dbEntityController.find('attendance', { intake: intake });
        var todayLectures = [];
        
        for (var i = 0; i < attendanceList.length; i++) {
            var lecture = attendanceList[i];
            var startDate = new Date(lecture.startDate);

            if (today.getDate() === startDate.getDate()
                && today.getMonth() === startDate.getMonth()
                && today.getFullYear() === startDate.getFullYear()) {

                var attendanceStatus = '';
                var presencePercent = '';

                for (var j = 0; j < lecture.logs.length; j++) {
                    if (lecture.logs[j].studentID === studentID) {
                        attendanceStatus = lecture.logs[j].status;
                        presencePercent = lecture.logs[j].presencePercent;
                        break;
                    }
                }

                todayLectures.push({
                    id: lecture.id,
                    module: lecture.module,
                    studentAttendanceStatus: attendanceStatus,
                    studentPresencePercent: presencePercent
                });
            }
        }

        httpHelper.res(res, todayLectures);        
    } catch(err) {
        httpHelper.err(res, err);
    }
}

router.post('/create', create);
router.post('/updateFromBeacon', updateFromBeacon);
router.put('/', update);
router.get('/:id', find);
router.get('/criteria/:intake/:module/:startDate/:endDate', findByCriteria);
router.get('/summary/:intake/:module/:studentID', findSummary);
router.get('/daily/lectures/:studentID/:intake', findDailyLectures);

module.exports = router;
