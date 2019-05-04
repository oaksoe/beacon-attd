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
    public status: string;
    public presencePercent: number;
}