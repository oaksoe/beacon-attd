import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
    LoginComponent,
    DataUploadsComponent,
    ScheduleComponent,
    AttendanceListComponent,
    AttendanceReportComponent
} from './components';

import { AuthGuard } from './guards/auth.guard';


const MAINMENU_ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent }, 
    { path: 'dataUploads', component: DataUploadsComponent, canActivate: [AuthGuard] }, 
    { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] }, 
    { path: 'attendanceList/:id', component: AttendanceListComponent, canActivate: [AuthGuard] },
    { path: 'attendanceReport', component: AttendanceReportComponent, canActivate: [AuthGuard] },
]

@NgModule({
    imports: [ RouterModule.forRoot(MAINMENU_ROUTES, { enableTracing: false }) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
