import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PubSubService, AuthService } from '../../../services';
import { PubSubEventType } from '../../../models';

@Component({
    selector: 'itlx-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isLoggedIn = false;
    private ngUnsubscribe = new Subject<void>();

    constructor (
        private pubSubService: PubSubService,
        private authService: AuthService,
        private router: Router,
    ) {
    }

    public ngOnInit() {
        this.pubSubService.getSubscription()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((event) => {
                if (event === undefined) return;
                
                if (event.type === PubSubEventType.USER_LOGGEDIN) {
                    this.isLoggedIn = true;
                }                
            }); 
    }

    public toggleSideMenu() {
        this.pubSubService.publish({
            type: PubSubEventType.TOGGLE_SIDEMENU
        });
    }

    public onLogout() {
        this.isLoggedIn = false;
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
