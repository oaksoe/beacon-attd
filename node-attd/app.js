var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var morgan = require('morgan');
var cors = require('cors');
var fs = require('fs');
var path = require('path');
var config = require('./config/config');
var httpHelper = require('./helpers/http');

var app = express();
var appConfig = config.get(app.get('env'));
var logStream = fs.createWriteStream(path.join(__dirname, 'logs'), { flags: 'a' })

app.use(helmet());
app.use(morgan('dev', { stream: logStream }));
app.use(bodyParser.json({limit: appConfig.app.http.jsonLimit }));
app.use(bodyParser.urlencoded({limit: appConfig.app.http.jsonLimit, extended: true}));
app.use(cookieParser());

// set cors
app.use(cors(httpHelper.corsOptions()));

// routes
var authRoute = require('./routes/auth');
var attendanceRoute = require('./routes/attendance');
app.use('/v1/api/auth/', authRoute);
app.use('/v1/api/attendance/', attendanceRoute);

// http error handlers
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// production error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err);
});

// init db connection
var db = require('./modules/db');
db.init(appConfig.db);

// start api server
var server = app.listen(appConfig.app.port, appConfig.app.host, () => {
	console.log('Attendance api service listening on address ' + 
		server.address().address + ":"+ server.address().port);
});

process.on('uncaughtException', function (err) {
    console.log(err);
});

process.on('SIGINT', function(){
	console.log('App exited!');
    process.exit(0);
});
