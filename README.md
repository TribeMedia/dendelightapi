# oseam Application
* <a href="#requirements">Requirements</a>
* <a href="#how-to-install-dependencies">How to install & run</a>
* <a href="#online-api-test">Online API test</a>
* <a href="#location">Location</a>
* <a href="#get-different-service-information">Service Information</a>
* <a href="#user-flow">User Flow</a>
* <a href="#provider-flow">Provider Flow</a>
* <a href="#admin-flow">Admin Flow</a>

# Requirements
* <a href="https://www.mongodb.org/downloads">Mongodb</a>
* <a href="https://nodejs.org/">Node.js</a> or <a href="https://iojs.org/en/index.html">io.js</a>

# How to Install & Run
Open Terminal/Powershell & CD into where oseam-app is located & Run these commands
```
$ sudo npm install
```
In a new terminal, Run This command *(Required for Database)*
```
$ mongod
```
Then in the other terminal (where you installed the dependencies) Run this command
```
$ npm start
```
* You might not need to run as Super user (sudo)
* Don't include ```$``` into your commands
* To access authorize location, set Authorization header with *'Bearer' + token* .

# Online API test
http://oseam.herokuapp.com

# Location

##### Get lat, lng and postcode by address
  * POST: /api/v1/latlng
  * Required params: address

##### Get address by latlng
  * GET: /api/v1/address
  * Params: lat, lng

##### Get location info by ip
  * GET: /api/v1/location

# Get different service information

##### Get service info (mowing, leaf_removal, weed_control, yard_cleaning)
  * GET: /api/v1/services
  * Params: name, type, duration, price
  * Example GET: /api/v1/services?name=mowing&type=small

# User flow

##### Register account
  * POST: /api/v1/user
  * Required params: email, password
  * Json response example
```json
{
  "user": {
    "email": "hello@gmail.com",
    "verified": false,
    "updatedAt": "2015-04-16T08:37:49.375Z",
    "id": "552f74dd3917d69f0d9800ca"
  }
}
```

##### User Login. NOTE: in development, login with out verifying account.
	* POST: /api/v1/user_login
	* Params: email, password
  * Json response example
```json
{
  "user": {
    "email": "hello@gmail.com",
    "password": "$2a$10$oDTKkwnz7y6QuRt26u4hjb9XjSj8mm4nzRphGUiERc0fgArFG",
    "verified": true,
    "createdAt": "2015-04-16T08:37:49.375Z",
    "updatedAt": "2015-04-16T08:37:49.375Z",
    "id": "552f74dd3917d69f0d9800ca"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImVtYWlsIjoidnVvbmduZ28ucGRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkb2dPZElEVEtrd256N3k2UXVSdDI2dTRoamI5WGpTajhtbTRuelJwaEdVaUVSYzBmZ0FyRkciLCJ2ZXJpZmllZCI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMTUtMDQtMTZUMDg6Mzc6NDkuMzc1WiIsInVwZGF0ZWRBdCI6IjIwMTUtMDQtMTZUMDg6Mzc6NDkuMzc1WiIsImlkIjoiNTUyZjc0ZGQzOTE3ZDY5ZjBkOTgwMGNhIn0sImlhdCI6MTQyOTE3MzU2MCwiZXhwIjoxNDI5MjU5OTYwfQ.5Z_FLhf7Uvv1TO5_YOWRbRE88hF094StMpdcU3pahoE"
}
```
##### Facebook oauth
	* GET: /api/v1/auth/facebook
	* Automatic callback at: /api/v1/auth/facebook/callback
  * Json response example
```json
{
  "success": true,
  "user": {
  	"apiProvider": "Facebook",
    "email": "hello@gmail.com",
    "password": "$2a$10$oDTKkwnz7y6QuRt26u4hjb9XjSj8mm4nzRphGUiERc0fgArFG",
    "verified": true,
    "createdAt": "2015-04-16T08:37:49.375Z",
    "updatedAt": "2015-04-16T08:37:49.375Z",
    "id": "552f74dd3917d69f0d9800ca"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImVtYWlsIjoidnVvbmduZ28ucGRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkb2dPZElEVEtrd256N3k2UXVSdDI2dTRoamI5WGpTajhtbTRuelJwaEdVaUVSYzBmZ0FyRkciLCJ2ZXJpZmllZCI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMTUtMDQtMTZUMDg6Mzc6NDkuMzc1WiIsInVwZGF0ZWRBdCI6IjIwMTUtMDQtMTZUMDg6Mzc6NDkuMzc1WiIsImlkIjoiNTUyZjc0ZGQzOTE3ZDY5ZjBkOTgwMGNhIn0sImlhdCI6MTQyOTE3MzU2MCwiZXhwIjoxNDI5MjU5OTYwfQ.5Z_FLhf7Uvv1TO5_YOWRbRE88hF094StMpdcU3pahoE"
}
```

##### Update account
	* PUT: /api/v1/user/:id

##### Destroy account
	* DELETE: /api/v1/user/:id

##### Create booking
	* POST: /api/v1/booking
	* Required params: services (array), estimatedSize, address, bookTime (in milliseconds), estimatedDuration (in milliseconds), wage
  * Additional params: postcode, lat, lng, repeat
  * Json response example
```json
{
  "booking": {
    "userId": "553b231b84e52c8222b105db",
    "services": [
      {
        "name": "mowing",
        "id": "553b232b84e52c8222b105dc"
      }
    ],
    "completed": false,
    "createdAt": "2015-04-25T05:16:27.506Z",
    "updatedAt": "2015-04-25T05:16:27.506Z",
    "id": "553b232b84e52c8222b105de"
  },
  "services": [
    {
      "estimatedSize": "Medium",
      "address": "16 Keats Ave, Kingsbury",
      "bookTime": 1429977804187,
      "estimatedDuration": 1440000,
      "wage": 30,
      "location": {
        "type": "Point",
        "coordinates": [
          145.036478,
          -37.718564
        ]
      },
      "postcode": 3083,
      "providerId": "553b22da84e52c8222b105da",
      "name": "mowing",
      "repeat": null,
      "completed": false,
      "createdAt": "2015-04-25T05:16:27.500Z",
      "updatedAt": "2015-04-25T05:16:27.500Z",
      "id": "553b232b84e52c8222b105dc"
    }
  ]
}
```
##### View list of previous booking by user
	* GET: /api/v1/view_booking
  * Params: completed (true or false)
```json
[
{
    "userId": "553b231b84e52c8222b105db",
    "services": [
      {
        "name": "mowing",
        "id": "553b232b84e52c8222b105dc"
      }
    ],
    "completed": false,
    "createdAt": "2015-04-25T05:16:27.506Z",
    "updatedAt": "2015-04-25T05:16:27.506Z",
    "id": "553b232b84e52c8222b105de",
    "info": [
      {
        "estimatedSize": "Medium",
        "address": "16 Keats Ave, Kingsbury",
        "bookTime": 1429977804187,
        "estimatedDuration": 1440000,
        "wage": 30,
        "location": {
          "type": "Point",
          "coordinates": [
            145.036478,
            -37.718564
          ]
        },
        "postcode": 3083,
        "providerId": "553b22da84e52c8222b105da",
        "name": "mowing",
        "repeat": null,
        "completed": false,
        "createdAt": "2015-04-25T05:16:27.500Z",
        "updatedAt": "2015-04-25T05:16:27.510Z",
        "bookingId": "553b232b84e52c8222b105de",
        "id": "553b232b84e52c8222b105dc"
      }
    ]
  }
]
```

##### Update booking time
  * PUT: /api/v1/booking/:id
  * Params: bookTime (in milliseconds)

##### Destroy booking
  * DELETE: /api/v1/booking/:id

##### Logout
	* GET: /api/v1/logout
	* OR: simply clear token in session or local-service

# Provider flow

##### Register account
  * POST: /api/v1/provider
  * Required params: email, password, firstName, lastName, abn, address, service (in array), 
  * Additional params: businessName, postcode, lat, lng, service
  * Json response example
```json
{
  "provider": {
    "email": "xxx@gmail.com",
    "password": "$2a$10$9ilqAUVldTFUjIEF2nJBOOOIclaEUREtLvP9FvFAO9bc8K75aZ9iu",
    "firstName": "xxx",
    "lastName": "xxx",
    "abn": "312132",
    "address": "16 Keats Avenue, Kingsbury",
    "service": [
        "mowing"
    ],
    "location": {
        "type": "Point",
        "coordinates": [
            145.036478,
            -37.718564
        ]
    },
    "postcode": "3083",
    "verified": false,
    "stripe_account": false,
    "createdAt": "2015-04-25T05:15:06.945Z",
    "updatedAt": "2015-04-25T05:15:06.945Z",
    "id": "553b22da84e52c8222b105da"
  }
}
```
##### Provider Login
  * POST: /api/v1/provider_login
  * Parameters: email, password
  * Json response example
```json
{
  "provider": {
      "email": "hello@gmail.com",
      "password": "$2a$10$zVINlvmzYckalBg.zASkce.OJCliMW.hHAGSAQKfliSFGk3chvAYS",
      "firstName": "Tome",
      "lastName": "Ngo",
      "abn": "312132",
      "verified": true,
      "stripe_account": false,
      "createdAt": "2015-04-16T10:45:12.052Z",
      "updatedAt": "2015-04-16T10:45:12.052Z",
      "id": "552f849a3917d69f0d9800cc"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcm92aWRlciI6eyJlbWFpbCI6InZ1b25nbmdvLnBkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJHpWSU5sdm16WWNrYWxCZy56QVNrY2UuT0pDbGlNVy5oSEFHU0FRS2ZsaVNGR2szY2h2QVlTIiwiZmlyc3ROYW1lIjoidnVvbmciLCJsYXN0TmFtZSI6Im5nbyIsImFibiI6IjMxMjEzMiIsInZlcmlmaWVkIjpmYWxzZSwic3RyaXBlX2FjY291bnQiOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDE1LTA0LTE2VDEwOjQ1OjEyLjA1MloiLCJ1cGRhdGVkQXQiOiIyMDE1LTA0LTE2VDEwOjQ1OjEyLjA1MloiLCJpZCI6IjU1MmY5MmI4MGM4NTRiODIxNDkxZTJiZCJ9LCJpYXQiOjE0MjkxODExMTYsImV4cCI6MTQyOTI2NzUxNn0.k_ALD-Y8tpeuuM7Wb4FQIHeoZdYawC6tyic6YP1UmWw"
}
```

##### Update account
  * PUT: /api/v1/provider

##### Destroy account
  * DELETE: /api/v1/provider/:id

##### View queued tasks by provider
  * GET: /api/v1/provider_task

##### View tasks
  * GET: /api/v1/provider_task
  * Params: completed (true or false)
```json
[
  {
    "estimatedSize": "Medium",
    "address": "16 Keats Ave, Kingsbury",
    "bookTime": 1429977804187,
    "estimatedDuration": 1440000,
    "wage": 30,
    "location": {
      "type": "Point",
      "coordinates": [
        145.036478,
        -37.718564
      ]
    },
    "postcode": 3083,
    "providerId": "553b22da84e52c8222b105da",
    "name": "mowing",
    "repeat": null,
    "completed": false,
    "createdAt": "2015-04-25T05:16:27.500Z",
    "updatedAt": "2015-04-25T05:16:27.510Z",
    "bookingId": "553b232b84e52c8222b105de",
    "id": "553b232b84e52c8222b105dc"
  }
]
```

##### Reject task
  * PUT: /api/v1/reject_task/:id

##### Update task
  * PUT: /api/v1/provider_mowing/:id
  * Similarly: provider_leaf_removal, provider_weed_control, provider_yard_cleaning
  * Params: realSize, startTime, endTime, completed

##### Logout
  * GET: /api/v1/logout
  * OR: simply clear token in session or local-service

##### Socket io for real-time push notification
  * EXAMPLE
```javascript
var socket = io('/provider_' + providerId);
socket.on('notification', function(data) {
  console.log(data);
});
```

# Admin flow

##### Admin Login
  * POST: /api/administrator
  * Parameters: email, password
  * Json response: { provider: {xxx}, token: xxx }

##### Find user by id
  * GET: /api/v1/user/:id

##### Find all users
  * GET: /api/v1/user

##### Find provider by id
  * GET: /api/v1/provider/:id

##### Find all providers
  * GET: /api/v1/provider

##### Find booking by id
  * GET: /api/v1/booking/:id

##### Find all bookings
  * GET: /api/v1/booking

##### CRUD different services (mowing, leaf_removal, weed_control, yard_cleaning)
  * GET: /api/v1/mowing
  * PUT: /api/v1/mowing
