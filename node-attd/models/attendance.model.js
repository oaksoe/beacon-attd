"use strict";

var uuid = require('../helpers/uuid');
var constants = require('../helpers/constants');

class Attendance {
    constructor(studentID) {
        this.id = uuid.create();
        this.studentID = studentID;
        this.status = constants.ATTDENDANCE_STATUS.OPEN;
        this.createdAt = new Date();
    }

    set status(status) {
        this._status = status; 
    }

    get status() {
        return this._status;
    }

    set studentID(id) {
        this._studentID = id; 
    }

    get studentID() {
        return this._studentID;
    }
}

module.exports = Attendance;
