# APIs
Note: use Postman to test the apis

## Auth apis
# Create at least 1 admin for system to be usable
url: http://localhost:8000/v1/api/auth/create
method: POST
Body: {
	"username": "david",
	"password": "123",
	"name": "David",
	"type": "Admin"
}

url: http://localhost:8000/v1/api/auth/login
method: POST
Body: {
	"username": "david",
	"password": "123"
}

## Attendance apis
url: http://localhost:8000/v1/api/attendance/create
method: POST
Body: {
	"studentID": "TP012345"
}
