import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { ScheduleService, IntakeService } from '../../../services';

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
  
    public lectures: CalendarEvent[];
    public intakes: string[];
    public intake: string;
        
    constructor(
        private scheduleService: ScheduleService,
        private intakeService: IntakeService,
    ) {
        this.intakes = this.intakeService.getIntakes();
        this.intake = this.intakes[0];
        this.setLectures();
    }
  
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
        this.lectures = this.lectures.map(iEvent => {
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
        console.log('hello');
    }
  
    public closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    public setView(view: CalendarView) {
        this.view = view;
    }

    public onIntakeChanged() {
        this.setLectures();
    }

    private setLectures() {
        this.lectures = this.scheduleService.getSchedule(this.intake);
    }
}
  