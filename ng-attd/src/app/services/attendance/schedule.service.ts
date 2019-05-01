import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay, endOfMonth, addHours } from 'date-fns';
import { Schedule } from '../../models';
import { ModuleService } from './module.service';

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

@Injectable()
export class ScheduleService {
    constructor(
        private moduleService: ModuleService
    ) {

    }

    public getSchedule(intake: string): CalendarEvent[] {
        let lectures = [];
        const today = startOfDay(new Date());
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        lectures = [...lectures, ...this.populateMonthlyLectureEvents(intake, currentMonth - 1, currentYear)];
        lectures = [...lectures, ...this.populateMonthlyLectureEvents(intake, currentMonth, currentYear)];
        lectures = [...lectures, ...this.populateMonthlyLectureEvents(intake, currentMonth + 1, currentYear)];
        
        return lectures; 
    }

    private populateMonthlyLectureEvents(intake: string, currentMonth: number, currentYear: number): CalendarEvent[] {
        let lectures = [];        

        const dateEnd = new Date(currentYear, currentMonth + 1, 0).getDate();

        for(let i = 1; i <= dateEnd; i++) {
            var currentDate = new Date(currentYear, currentMonth, i);
            var currentDay = currentDate.getDay();

            // if weekend, continue
            if (currentDay == 0 || currentDay == 6) {
                continue;
            }

            lectures = [...lectures, ...this.populateDailyLectureEvents(intake, currentDate, currentDay)];
        }

        return lectures;
    }

    private populateDailyLectureEvents(intake: string, date: Date, day: number): CalendarEvent[] {
        const lectures: CalendarEvent[] = [];
        const dailyModules = Schedule[intake][day];
        const moduleNames = this.moduleService.getModules();        
        const modules = dailyModules.split(',');

        if (modules.length > 0 && modules[0]) {
            for (let i = 0; i < modules.length; i++) {
                const moduleIndex = modules[i];
                const moduleName = moduleNames[moduleIndex];
                lectures.push(this.createLectureEvent(date, i, moduleName));
            }
        }

        return lectures;
    }

    private createLectureEvent(date: Date, timeIndex: number, moduleName: string): CalendarEvent {
        const startHourOfTheDay = 8;
        const startHourOfLectures = [0, 2, 5, 7];
        const lecturePeriod = 2;
        const startHoursToAdd = startHourOfTheDay + startHourOfLectures[timeIndex];
        const endHoursToAdd = startHoursToAdd + lecturePeriod;

        return {
            start: addHours(date, startHoursToAdd),
            end: addHours(date, endHoursToAdd),
            title: moduleName,
            color: colors.yellow,
        };
    }
}
