import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatStepperModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatListModule, 
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDividerModule,
    MatSortModule,
    MatMenuModule,
    MatExpansionModule,
} from '@angular/material';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

import {
    HeaderComponent,
    SidemenuComponent,
    LoginComponent,
    DataUploadsComponent,
    ScheduleComponent,
    CalendarComponent,
    AttendanceListComponent,
    AttendanceSummaryComponent,
    AttendanceStatisticsComponent,
} from './components';

import {
    ConfigService,
    HttpService,
    PubSubService,
    AuthService,
    UserApiService,
    AttendanceApiService,
    IntakeService,
    ModuleService,
    ScheduleService
} from './services';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidemenuComponent,
        LoginComponent,
        DataUploadsComponent,
        ScheduleComponent,
        CalendarComponent,
        AttendanceListComponent,
        AttendanceSummaryComponent,
        AttendanceStatisticsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule, 
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        MatButtonModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatPaginatorModule,
        MatDialogModule,
        MatDividerModule,
        MatSortModule,
        MatMenuModule,
        MatExpansionModule,
        CalendarModule.forRoot ({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        NgxChartsModule,
    ],
    providers: [
        ConfigService,
        HttpService,
        PubSubService,
        AuthService,
        UserApiService,
        AttendanceApiService,
        IntakeService,
        ModuleService,
        ScheduleService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
