import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
 
@Injectable()
export class UserApiService {
    constructor(private http: HttpService<any>) {
    }

    public createUser(user): Observable<any> {
        return this.http.post('/user/create', user)
            .pipe(map((result: any) => {
                return result;
            }), catchError(err => Observable.throw(err)));
    }

    public createUsers(users): Observable<any> {
        return this.http.post('/user/createAll', users)
            .pipe(map((result: any) => {
                return result;
            }), catchError(err => Observable.throw(err)));
    }

    public getUser(username : string):  Observable<any>  {
        return this.http.get('/user/' + encodeURIComponent(username))
            .pipe(map((result: any) => {
                return result;
            }), catchError(err => Observable.throw(err)));
    }

    public getAllUsers(): Observable<any> {
        return this.http.get('/user/')
            .pipe(map((result: any) => {
                const data = result.data;
                return result;
            }), catchError(err => Observable.throw(err)));
    }

    public getStudentsByCriteria(intake: string, intakeModule: string): Observable<any> {
        const criteria = [ encodeURIComponent(intake),
            encodeURIComponent(intakeModule)].join('/');

        return this.http.get('/user/students/' + criteria)
            .pipe(map((result: any) => {
                const data = result.data;
                return result;
            }), catchError(err => Observable.throw(err)));
    } 
}
