import { Component, OnInit } from '@angular/core';
import { PubSubService } from '../../../services';
import { PubSubEventType } from '../../../models';

@Component({
    selector: 'itlx-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor(
        private pubSubService: PubSubService,
    ) {
    }

    public ngOnInit() { 
    }

    public toggleSideMenu() {
        this.pubSubService.publish({
            type: PubSubEventType.TOGGLE_SIDEMENU
        });
    }
}
