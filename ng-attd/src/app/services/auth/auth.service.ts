import { Injectable } from '@angular/core';
import { User } from '../../models';
 
@Injectable()
export class AuthService {
    private user: User;
    private loggedIn = false;

    constructor() {
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
            email: '',
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
    
    public login(username: string, password: string): boolean {
        return true;
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
