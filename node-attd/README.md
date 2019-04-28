# APIs
Note: use Postman to test the apis

## Auth apis
# Create at least 1 admin and 1 lecturer for system to be usable
url: http://localhost:8000/v1/api/user/create
method: POST
Body: 
{
	"username": "admin",
	"password": "admin",
	"name": "admin",
	"role": "Admin"
}

{
	"username": "lecturer",
	"password": "lecturer",
	"name": "Lecturer",
	"role": "Lecturer"
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
