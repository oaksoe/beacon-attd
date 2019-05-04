import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PubSubService, AuthService } from '../../../services';
import { PubSubEventType, UserType } from 'src/app/models';

@Component({
    selector: 'itlx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {    
    public loginForm: FormGroup;
    public loading = false;

    private user: any = {};

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private pubSubService: PubSubService,
        private authService: AuthService,
    ) {
    }
    
    public ngOnInit() {
        this.initLoginForm();
    }

    public onLoginClick() {
        this.authService.login(this.user.username, this.user.password)
            .subscribe(user => {
                if(user) {
                    this.pubSubService.publish({
                        type: PubSubEventType.USER_LOGGEDIN
                    });
        
                    const userRole = this.authService.getUserRole();
                    let redirectRoute = '/schedule';

                    if (userRole === UserType.ADMIN) {
                        redirectRoute = '/dataUploads';
                    }

                    this.router.navigate([redirectRoute]);
                }
            }, err => { 
                console.log(err);
        });
    }

    private initLoginForm() {
        this.loginForm = this.formBuilder.group({
            usernameControl: ['', [Validators.required]],
            passwordControl: ['', [Validators.required]]
        });
    }
}
