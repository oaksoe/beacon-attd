import { Component, ChangeDetectorRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PubSubService, AuthService } from '../../../services';
import { PubSubEventType } from '../../../models';

@Component({
    selector: 'itlx-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav') sidenav;

    public userLoggedIn = false;
    public currentUserRole = '';

    private mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    private ngUnsubscribe = new Subject<void>();

    constructor(
        private media: MediaMatcher,
        private cdr: ChangeDetectorRef,
        private pubSubService: PubSubService,
        private authService: AuthService,
    ) {
        this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => this.cdr.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    public ngOnInit() {
        this.pubSubService.getSubscription()
            .pipe(
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(event => {
                if (event) {
                    if (event.type === PubSubEventType.TOGGLE_SIDEMENU) {
                        if (this.sidenav) {                            
                            this.sidenav.toggle();
                        }
                    } else if (event.type === PubSubEventType.USER_LOGGEDIN) {
                        this.userLoggedIn = true;
                        this.currentUserRole = this.authService.getUserRole();
                    }
                } 
            });  
    }

    public ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
