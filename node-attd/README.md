# APIs
Note: use Postman to test the apis

## Auth apis
# Create at least 1 user and 1 lecturer for system to be usable
url: http://localhost:8000/v1/api/auth/create
method: POST
Body: {
	"username": "myo",
	"password": "123",
	"name": "Myo",
	"type": "Student"
}

url: http://localhost:8000/v1/api/auth/login
method: POST
Body: {
	"username": "myo",
	"password": "123"
}

## Attendance apis
url: http://localhost:8000/v1/api/attendance/create
method: POST
Body: {
	"studentID": "TP012345"
}
