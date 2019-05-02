import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceApiService } from '../../../services';
import { Attendance } from '../../../models';

@Component({
    selector: 'attd-attendance-list',
    templateUrl: './attendance-list.component.html',
    styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
    public attendance: Attendance;    
    constructor(
        private route: ActivatedRoute,
        private attendanceApiService: AttendanceApiService
    ) {
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
                    startDate: result.data.startDate,
                    endDate: result.data.endDate,
                    logs: result.data.logs,
                };
            }, err => { 
                console.log(err);
            });
    }
}
