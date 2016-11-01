NodeJS ES6 MongoDB
==============

Simple NodeJS startup

Installation MongoDB (macOS Sierra)
--------------
Download MongoDB

    https://www.mongodb.com/download-center
    
edit .bash_profile

    export PATH=~/Documents/mongodb/bin:$PATH

start database

    mongod

Used libraries
--------------

* co - https://github.com/tj/co
* express - https://github.com/expressjs/express
* bodyParser - https://github.com/expressjs/body-parser
* mongorito - https://github.com/vdemedes/mongorito
* morgan - https://github.com/expressjs/morgan
* jsonwebtoken - https://github.com/auth0/node-jsonwebtoken

Installation
--------------

    $ git clone https://github.com/usecode/nodejs-express-es6
    $ npm install
    $ npm run auto-start

Routes
--------------

**Add new user to mongodb**

PUT

    /api/user

Request

    {
        "user": "usecode",
        "password": "UseC0d3"
    }

Response

    {
      "result": true,
      "user": {
        "name": "usecode",
        "password": "UseC0d3",
        "created_at": "2016-11-01T23:03:58.387Z",
        "updated_at": "2016-11-01T23:03:58.387Z",
        "_id": "58191f5eaecdc785fcfc5013"
      }
    } 

**Get all users**

GET

    /api/users

Response
    
    [
        {
            "_id": "58191f5eaecdc785fcfc5013",
            "name": "pavel",
            "password": "password",
            "created_at": "2016-11-01T23:03:58.387Z",
            "updated_at": "2016-11-01T23:03:58.387Z"
        },
        {
            "_id": "581920540226da86b1c615a8",
            "name": "usecode",
            "password": "UseC0d3",
            "created_at": "2016-11-01T23:08:04.001Z",
            "updated_at": "2016-11-01T23:08:04.001Z"
        }
    ]

**Authenticate with JSON Web Token**

POST

    /api/authenticate

Request

    {
        "user": "usecode",
        "password": "UseC0d3"
    }

Response

    {
        "success": true,
        "message": "Enjoy your token!",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdHRyaWJ1dGVzIjp7Il9pZCI6IjU4MTkyMDU0MDIyNmRhODZiMWM2MTVhOCIsIm5hbWUiOiJ1c2Vjb2RlIiwicGFzc3dvcmQiOiJVc2VDMGQzIiwiY3JlYXRlZF9hdCI6IjIwMTYtMTEtMDFUMjM6MDg6MDQuMDAxWiIsInVwZGF0ZWRfYXQiOiIyMDE2LTExLTAxVDIzOjA4OjA0LjAwMVoifSwiY2hhbmdlZCI6e30sInByZXZpb3VzIjp7fSwib3B0aW9ucyI6eyJwb3B1bGF0ZSI6e319LCJpYXQiOjE0NzgwNDE4NDcsImV4cCI6MTQ3ODA0MzI4N30.BMrubysMzV3eer8LqGs3fyIyxWC2BTP-XPmJRMPM8N0"
    }

TODO
--------------
a lot ;)
