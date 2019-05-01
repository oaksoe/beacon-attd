import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';
  
const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
};
  
@Component({
    selector: 'attd-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
    public view: CalendarView = CalendarView.Month;  
    public CalendarView = CalendarView;
    public viewDate: Date = new Date();
    public refresh: Subject<any> = new Subject();
    public activeDayIsOpen: boolean = true;
    
    public actions: CalendarEventAction[] = [
        {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                debugger;
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                debugger;
                this.handleEvent('Deleted', event);
            }
        }
    ];
  
    public events: CalendarEvent[] = [
        {
            start: subDays(startOfDay(new Date()), 1),
            end: addDays(new Date(), 1),
            title: 'A 3 day event',
            color: colors.red,
            actions: this.actions,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            },
            draggable: true
        },
        {
            start: startOfDay(new Date()),
            title: 'An event with no end date',
            color: colors.yellow,
            actions: this.actions
        },
        {
            start: subDays(endOfMonth(new Date()), 3),
            end: addDays(endOfMonth(new Date()), 3),
            title: 'A long event that spans 2 months',
            color: colors.blue,
            allDay: true
        },
        {
            start: addHours(startOfDay(new Date()), 2),
            end: new Date(),
            title: 'A draggable and resizable event',
            color: colors.yellow,
            actions: this.actions,
            resizable: {
                beforeStart: true,
                afterEnd: true
            },
            draggable: true
        }
    ];  
    
    constructor() {}
  
    public dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
        }
    }
  
    public eventTimesChanged({
      event,
      newStart,
      newEnd
    }: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map(iEvent => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd
                };
            }

            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }
  
    public handleEvent(action: string, event: CalendarEvent): void {
        debugger;
        console.log('hello');
    }
  
    public closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }
}
  