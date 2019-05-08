import { Component, OnInit } from '@angular/core';
import { Student, UserType, ModuleAttendanceSummary } from '../../../models';
import { AuthService, UserApiService, AttendanceApiService } from '../../../services';

@Component({
    selector: 'attd-attendance-statistics',
    templateUrl: './attendance-statistics.component.html',
    styleUrls: ['./attendance-statistics.component.scss']
})
export class AttendanceStatisticsComponent implements OnInit {
    public summaryViewData = [];
    public modulesSummaryViewData = [];
    public summaryView: any[] = [1200, 250];
    public summaryViewLabel = "Statistics for the module";
    public modulesSummaryViewLabel = "Statistics on Most Attending Modules";

    public colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    public student: Student;
    public students: Student[] = [];
    public currentRole = '';
    public modulesSummary: ModuleAttendanceSummary[];
    
    constructor(
        private authService: AuthService,
        private userApiService: UserApiService,
        private attendanceApiService: AttendanceApiService,
    ) {
        this.student = new Student();
        this.modulesSummary = [];
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

    public tabChanged(event) {
        this.loadSummaryViewData(event.index);
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
                    this.modulesSummary = [];
                    result.data.forEach(summary => {
                        this.modulesSummary.push({
                            module: summary.module,
                            attendancePercent: summary.attendancePercent,
                            unmarkedCount: summary.unmarkedCount,
                            presentCount: summary.presentCount,
                            absentCount: summary.absentCount,
                            lateCount: summary.lateCount
                        });

                        this.loadModulesSummaryViewData();
                        this.loadSummaryViewData(0);
                    });
                }
            }, err => { 
                console.log(err);
            });
    }

    private loadModulesSummaryViewData() {
        this.modulesSummaryViewData = [];
        const modulesData = [];
        let totalModulesPercent = 0;

        this.modulesSummary.forEach(moduleSummary => {
            totalModulesPercent += parseInt(moduleSummary.attendancePercent);
        });

        if (totalModulesPercent !== 0) {
            this.modulesSummary.forEach(moduleSummary => {
                const attendancePercent = parseInt(moduleSummary.attendancePercent) / totalModulesPercent;
                modulesData.push({
                    'name': moduleSummary.module,
                    'value': attendancePercent
                });
            });
        }

        this.modulesSummaryViewData = modulesData;
    }

    private loadSummaryViewData(index: number) {
        const moduleSummary = this.modulesSummary[index];
        const totalCount = parseInt(moduleSummary.presentCount) + parseInt(moduleSummary.lateCount) + parseInt(moduleSummary.absentCount);
        const presentCount = parseInt(moduleSummary.presentCount) / totalCount;
        const lateCount = parseInt(moduleSummary.lateCount) / totalCount;
        const absentCount = parseInt(moduleSummary.absentCount) / totalCount;

        if (totalCount === 0) {
            this.summaryViewData = [];
        } else {
            this.summaryViewData = [
                {
                  'name': 'Present',
                  'value': presentCount
                  },
                {
                  'name': 'Late',
                  'value': lateCount
                },
                {
                  'name': 'Absent',
                  'value': absentCount
                }
            ];    
        }
    }
}
