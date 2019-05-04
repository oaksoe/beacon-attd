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

    public getAttendance(id: string):  Observable<any>  {
        return this.http.get('/attendance/' + encodeURIComponent(id))
            .pipe(map((result: any) => {
                return result;
            }), catchError(err => Observable.throw(err)));
    }
    
    public getAttendanceByCriteria(intakeModule: string, intake: string, startDate: Date, endDate: Date):  Observable<any>  {
        const criteria = [ encodeURIComponent(intakeModule),
            encodeURIComponent(intake),
            startDate.toISOString(),
            endDate.toISOString()].join('/');

        return this.http.get('/attendance/criteria/' + criteria)
            .pipe(map((result: any) => {
                return result;
            }), catchError(err => Observable.throw(err)));
    }
}
