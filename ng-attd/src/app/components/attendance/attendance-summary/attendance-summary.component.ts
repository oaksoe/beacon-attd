import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Student, UserType, ModuleAttendanceSummary } from '../../../models';
import { AuthService, UserApiService, AttendanceApiService } from '../../../services';

@Component({
    selector: 'attd-attendance-summary',
    templateUrl: './attendance-summary.component.html',
    styleUrls: ['./attendance-summary.component.scss']
})
export class AttendanceSummaryComponent implements OnInit {
    public student: Student;
    public students: Student[] = [];
    public currentRole = '';
    
    public displayedColumns = ['no','module', 'attendancePercent','presentCount', 'unmarkedCount', 'absentCount','lateCount'];
    public dataSource: MatTableDataSource<ModuleAttendanceSummary>;
    
    constructor(
        private authService: AuthService,
        private userApiService: UserApiService,
        private attendanceApiService: AttendanceApiService,
    ) {
        this.student = new Student();
        this.dataSource = new MatTableDataSource([]);
    }
    
    public ngOnInit() {
        this.currentRole = this.authService.getUserRole();
        if (this.currentRole === UserType.LECTURER) {
            this.loadStudents();
        } else {
            this.student = this.authService.getUser() as Student;
            this.loadModuleAttendance();
        }
    }

    public onStudentChanged() {
        this.loadModuleAttendance();
    }

    private loadStudents() {
        this.userApiService.getUsersByRole(UserType.STUDENT)
            .subscribe(result => {
                this.students = result.data;
                
                if (this.students.length > 0) {
                    this.student = this.students[0];
                }

                this.loadModuleAttendance();
            }, err => { 
                console.log(err);
            });

    }

    private loadModuleAttendance() {
        const modules = this.student.modules.join(',');
        this.attendanceApiService.getAttendanceSummary(this.student.intake, modules, this.student.id)
            .subscribe(result => {
                if (result.data && result.data.length > 0) {
                    const modulesSummary: ModuleAttendanceSummary[] = [];
                    
                    result.data.forEach(summary => {
                        modulesSummary.push({
                            module: summary.module,
                            attendancePercent: summary.attendancePercent,
                            unmarkedCount: summary.unmarkedCount,
                            presentCount: summary.presentCount,
                            absentCount: summary.absentCount,
                            lateCount: summary.lateCount
                        });
                    });

                    this.dataSource.data = modulesSummary;
                }
            }, err => { 
                console.log(err);
            });
    }
}
