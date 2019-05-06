export const PubSubEventType = {
    TOGGLE_SIDEMENU: 'TOGGLE_SIDEMENU',
    USER_LOGGEDIN: 'USER_LOGGEDIN',
};

export const UserType = {
    ADMIN: 'ADMIN',
    LECTURER: 'LECTURER',
    STUDENT: 'STUDENT'
};

export const AttendanceStatus = {
    UNMARKED: 'UNMARKED',
    PRESENT: 'PRESENT',
    ABSENT: 'ABSENT',
    LATE: 'LATE'
}

export const Intakes = ['UC3F1805SE', 'UC3F1804BIT'];

export const Modules = [
    'CT001-1-1-RENG',
    'CT002-2-2-SDM',
    'CT003-3-3-CRI',
    'CT004-4-4-PRMGT',
    'CT005-5-5-SSAD',
    'CT006-6-6-SQE',
    'CT007-7-7-DDAC',
    'CT008-8-8-IMNPD'
];

export const Schedule = {
    'UC3F1805SE': ['', '0,1,2', '2,3', '0,1,3,4', '3,4', '2', ''],
    'UC3F1804BIT': ['', '0,5,6', '6,7', '0,1,5', '5,6,7', '1', '']
};
