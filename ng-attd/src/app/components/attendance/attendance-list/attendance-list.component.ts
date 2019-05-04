import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceApiService, AuthService } from '../../../services';
import { Attendance, AttendanceLog, AttendanceStatus } from '../../../models';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'attd-attendance-list',
    templateUrl: './attendance-list.component.html',
    styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
    public attendance: Attendance;  
    public lectureDate = '';
    public lectureTime = '';
    public statusList = [
        AttendanceStatus.UNMARKED,
        AttendanceStatus.PRESENT,
        AttendanceStatus.ABSENT,
        AttendanceStatus.LATE,
    ];

    public displayedColumns = ['no','id', 'name','status','presencePercent'];
    public dataSource: MatTableDataSource<AttendanceLog>;

    public currentUserRole: string;
    
    constructor(
        private route: ActivatedRoute,
        private attendanceApiService: AttendanceApiService,
        private authService: AuthService
    ) {
        this.attendance = new Attendance();
        this.dataSource = new MatTableDataSource([]);
        this.currentUserRole = this.authService.getUserRole();
    }
    
    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.loadAttendance(params['id']);
        });
    }

    private loadAttendance(id) {
        this.attendanceApiService.getAttendance(id)
            .subscribe(result => {
                this.attendance = {
                    id: result.data.id,
                    intake: result.data.intake,
                    module: result.data.module,
                    startDate: new Date(result.data.startDate),
                    endDate: new Date(result.data.endDate),
                    logs: result.data.logs,
                };

                if (this.currentUserRole === 'STUDENT') {
                    const studentID = this.authService.getUsername();
                    this.dataSource.data = this.attendance.logs.filter(log => log.studentID === studentID);
                } else {
                    this.dataSource.data = this.attendance.logs;
                }
                
                this.setLectureDateTime();
            }, err => { 
                console.log(err);
            });
    }

    public presencePercentChanged(log: AttendanceLog) {
        if (log.presencePercent < 0) {
            log.presencePercent = 0;
        } else if (log.presencePercent > 100) {
            log.presencePercent = 100;
        }
    }

    public updateAttendance() {
        this.attendanceApiService.updateAttendance(this.attendance)
            .subscribe(result => {
                alert('Attendance updated!');
            }, err => { 
                console.log(err);
            });
    }

    private setLectureDateTime() {
        const startDate = this.attendance.startDate;
        this.lectureDate = startDate.getDate() + '.' + startDate.getMonth() + '.' + startDate.getFullYear();

        this.lectureTime = startDate.getHours() + ':' + this.fillMinutes(startDate.getMinutes()) + ' - ' + 
            this.attendance.endDate.getHours() + ':' + this.fillMinutes(this.attendance.endDate.getMinutes());
    }

    private fillMinutes(minutes) {
        return minutes < 10 ? '0' + minutes : this.fillMinutes;
    }
}
