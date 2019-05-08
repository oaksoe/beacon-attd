# To run the entire system
1. Update server ip in 
    - node-attd (config.json -> host)
    - ng-attd (environment.ts -> host)
    - bams (Config.java -> API_IP)

2. Run the following
    - mongodb
    - node-attd (node app.js)
    - ng-attd (npm start)
    - run bams in android studio

3. Create admin and lecturer from Postman (Check README.md under node-attd)
    - username: admin, password: admin
    - username: lecturer, password: lecturer

3. In browser, go to http://localhost:4200. Then,
    - login as admin
    - upload students.csv (./ng-attd/data/students.csv) in Data Uploads page
    - login as lecturer
    - go to Schedule page and create attendance list for the current day for all the lectures of the day
        - go to Attendance list page of each lecture by clicking on the circle (with module name)
        - don't fill any data. Click on Update. This will create empty attendance record in the database.

4. Login bams mobile app with student username and password (same as student ID)