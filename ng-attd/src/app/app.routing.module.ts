import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
    LoginComponent,
    DataUploadsComponent,
    ScheduleComponent,
    AttendanceListComponent,
    AttendanceReportComponent
} from './components';


const MAINMENU_ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent }, 
    { path: 'dataUploads', component: DataUploadsComponent }, 
    { path: 'schedule', component: ScheduleComponent }, 
    { path: 'attendanceList/:id', component: AttendanceListComponent },
    { path: 'attendanceReport', component: AttendanceReportComponent },
]

@NgModule({
    imports: [ RouterModule.forRoot(MAINMENU_ROUTES, { enableTracing: false }) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
