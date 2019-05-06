export class Attendance {
    public id: string;
    public intake: string;
    public module: string;
    public startDate: Date;
    public endDate: Date;
    public logs: AttendanceLog[];
}

export class AttendanceLog {
    public studentID: string;    
    public studentName: string;
    public status: string;
    public presencePercent: number;
}

export class ModuleAttendanceSummary {
    public module: string;
    public attendancePercent: string;
    public unmarkedCount: string;
    public presentCount: string;
    public absentCount: string;
    public lateCount: string;
}
