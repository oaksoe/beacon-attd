import { Component, ChangeDetectorRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PubSubService } from '../../../services';
import { PubSubEventType } from '../../../models';

@Component({
    selector: 'itlx-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav') sidenav;

    private mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    private ngUnsubscribe = new Subject<void>();

    constructor(
        private media: MediaMatcher,
        private cdr: ChangeDetectorRef,
        private pubSubService: PubSubService,
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
                if (event && event.type === PubSubEventType.TOGGLE_SIDEMENU) {
                    this.sidenav.toggle();
                }
            });  
    }

    public ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
