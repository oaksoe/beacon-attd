import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../models';
import { HttpService } from '../api/http.service';
 
@Injectable()
export class AuthService {
    private user: User;
    private loggedIn = false;

    constructor(
        private http: HttpService<any>
    ) {
        this.resetUser();
    }

    public setUser(user: User) {
        this.user = user;
    }

    public getUser(): User {
        return this.user;
    }

    public getUsername(): string {
        return this.user.username;
    }

    public getUserRole(): string {
        return this.user.role;
    }

    public resetUser() {
        this.setUser({
            id: '',
            username: '',
            password: '',
            name: '',
            role: '',
        });
    }

    public setToken(value: string) {
        localStorage.setItem('token', value);
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }
    
    public removeToken() {
        localStorage.removeItem('token');
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();

        //check token here
        return true;
    }
    
    public login(username: string, password: string): Observable<any> {
        return this.http.post('/security/login', { username: username, password: password })
            .pipe(map((result: any) => {
                if (result.status === "SUCCESS") {
                    if (result.data) {
                        this.loggedIn = true;
                        this.setUser({
                            id: result.data.id,
                            username: result.data._username,
                            password: '',
                            name: result.data._name,
                            role: result.data._type
                        });
                        
                        return this.getUser();
                    } 

                    return null;
                }
                
                return null;
            }), catchError(err => Observable.throw(err)));
    }

    public isLoggedIn() {
        return this.loggedIn;
    }

    public logout(): void {
        this.loggedIn = false;
        this.resetUser();
        this.removeToken();
    }
}
