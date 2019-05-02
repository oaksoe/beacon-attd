import { Component, OnInit } from '@angular/core';
import { Student, UserType } from '../../../models';
import { UserApiService } from '../../../services';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'attd-data-uploads',
    templateUrl: './data-uploads.component.html',
    styleUrls: ['./data-uploads.component.scss']
})
export class DataUploadsComponent implements OnInit {
    public displayedColumns = ['no','id', 'name','intake','modules'];
    public dataSource: MatTableDataSource<Student>;
    public students: Student[];
    public hasFileToUpload = false;

    constructor(
        private userApiService: UserApiService,
    ) {
        this.students = [];
        this.dataSource = new MatTableDataSource([]);
    }
    
    public ngOnInit() {
    }
  
    public onFileSelect(input: HTMLInputElement) {  
        const files = input.files;
  
        if (files && files.length) {  
            const fileToRead = files[0];
  
            const fileReader = new FileReader();
            fileReader.onload = (fileLoadedEvent: any) => {
                const textFromFileLoaded = fileLoadedEvent.target.result;              
                const csvContent = textFromFileLoaded;        
                const rows = csvContent.split('\n');

                this.students = [];
                
                for (let i = 1; i < rows.length - 1; i++) {
                    const studentDetails = rows[i].split(',');
                    const studentID = studentDetails[0];
                    const modules = (studentDetails[3].split('\r')[0]).split(':');
                    this.students.push({
                        id: studentID,
                        username: studentID,
                        password: studentID,
                        name: studentDetails[1],
                        role: UserType.STUDENT,
                        intake: studentDetails[2],
                        modules: modules
                    });
                }

                this.onUploadClick();
            };
  
            fileReader.readAsText(fileToRead, "UTF-8");
            this.hasFileToUpload = true;
        }  
    }

    private onFileLoad(fileLoadedEvent) {
        
    }

    public onUploadClick() {
        if (this.students.length > 0) {
            this.userApiService.createUsers(this.students)
                .subscribe(result => {
                    this.dataSource.data = this.students;
                    this.hasFileToUpload = false;
                    console.log('Student records created.');
                }, err => { 
                    console.log(err);
            });
        }
    }
}
