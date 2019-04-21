import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface PubSubEvent {
    type: string;
    value?: {};
    values?: any[];
}

@Injectable()
export class PubSubService {
    private eventSubject = new BehaviorSubject<PubSubEvent>(undefined);

    public getSubscription(): Observable<PubSubEvent> {
        return this.eventSubject.asObservable(); 
    }

    public publish(eventItem: PubSubEvent) {
        this.eventSubject.next(eventItem);
    }
}
