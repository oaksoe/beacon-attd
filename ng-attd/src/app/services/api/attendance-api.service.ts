import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
import { Attendance } from '../../models';
 
@Injectable()
export class AttendanceApiService {
    constructor(private http: HttpService<any>) {
    }

    public createAttendance(attendance: Attendance): Observable<any> {
        return this.http.post('/attendance/create', attendance)
            .pipe(map((result: any) => {
                return result;
            }), catchError(err => Observable.throw(err)));
    }

    public updateAttendance(attendance: Attendance): Observable<any> {
        return this.http.put('/attendance/', attendance)
            .pipe(map((result: any) => {
                return result;
            }), catchError(err => Observable.throw(err)));
    }

    public getAttendance(id: string):  Observable<any>  {
        return this.http.get('/attendance/' + encodeURIComponent(id))
            .pipe(map((result: any) => {
                return result;
            }), catchError(err => Observable.throw(err)));
    }
    
    public getAttendanceByCriteria(intake: string, intakeModule: string, startDate: Date, endDate: Date):  Observable<any>  {
        const criteria = [ encodeURIComponent(intake),
            encodeURIComponent(intakeModule),
            startDate.toISOString(),
            endDate.toISOString()].join('/');

        return this.http.get('/attendance/criteria/' + criteria)
            .pipe(map((result: any) => {
                return result;
            }), catchError(err => Observable.throw(err)));
    }

    public getAttendanceSummary(intake: string, intakeModule: string, studentID: string):  Observable<any>  {
        const criteria = [ encodeURIComponent(intake),
            encodeURIComponent(intakeModule),
            encodeURIComponent(studentID)].join('/');

        return this.http.get('/attendance/summary/' + criteria)
            .pipe(map((result: any) => {
                return result;
            }), catchError(err => Observable.throw(err)));
    }
}
