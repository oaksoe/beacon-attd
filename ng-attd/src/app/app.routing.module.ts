import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
    LoginComponent,
    DataUploadsComponent,
    ScheduleComponent,
    AttendanceListComponent,
    ClasstimetableComponent
} from './components';


const MAINMENU_ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent }, 
    { path: 'dataUploads', component: DataUploadsComponent }, 
    { path: 'schedule', component: ScheduleComponent }, 
    { path: 'attendanceList', component: AttendanceListComponent },
    { path: 'classTimetable', component: ClasstimetableComponent }
]

@NgModule({
    imports: [ RouterModule.forRoot(MAINMENU_ROUTES, { enableTracing: false }) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
