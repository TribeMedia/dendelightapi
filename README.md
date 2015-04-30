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

##### Fetch provider nearby
  * POST: /api/v1/providers
  * Params: services (array), address, bookTime, estimatedDuration (calculated from service info above)
```Json
{
  "dis": 0,
  "obj": {
    "_id": "5541c38aeca343890e031819",
    "email": "xxx@gmail.com",
    "password": "$2a$10$FhYl2z.fifN8Wiczh7Hd8usSr3rVbhJxF53cbFzDSVUG0.BCw9SIW",
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
    "createdAt": "2015-04-30T05:54:18.122Z",
    "updatedAt": "2015-04-30T05:54:18.122Z"
  }
}
```
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
	* Required params: services (array), estimatedSize, address, bookTime (in milliseconds), estimatedDuration (in milliseconds), wage, providerId (when user selects provider)
  * Additional params: postcode, lat, lng, repeat
  * Json response example
```json
{
  "booking": {
    "userId": "5541c4de11b496bb0e24b2fa",
    "services": [
      {
        "name": "mowing",
        "id": "5541c50911b496bb0e24b2fb"
      }
    ],
    "bookTime": 1429977804187,
    "estimatedDuration": 1440000,
    "providerId": "5541c49f11b496bb0e24b2f9",
    "location": {
      "type": "Point",
      "coordinates": [
        145.036478,
        -37.718564
      ]
    },
    "completed": false,
    "createdAt": "2015-04-30T06:00:41.779Z",
    "updatedAt": "2015-04-30T06:00:41.779Z",
    "id": "5541c50911b496bb0e24b2fd"
  },
  "services": [
    [
      {
        "estimatedSize": "Medium",
        "address": "16 Keats Ave, Kingsbury",
        "wage": 30,
        "providerId": "5541c49f11b496bb0e24b2f9",
        "location": {
          "type": "Point",
          "coordinates": [
            145.036478,
            -37.718564
          ]
        },
        "postcode": 3083,
        "name": "mowing",
        "repeat": null,
        "completed": false,
        "createdAt": "2015-04-30T06:00:41.688Z",
        "updatedAt": "2015-04-30T06:00:41.782Z",
        "bookingId": "5541c50911b496bb0e24b2fd",
        "id": "5541c50911b496bb0e24b2fb"
      }
    ]
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
  "provider": [
    {
      "email": "xxx@gmail.com",
      "password": "$2a$10$x2DP1DPxqVwduFg0T/L1Ze6J9NPxE0xcu1j7tK6wNrgwBDrJwHPKe",
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
      "createdAt": "2015-04-30T05:58:55.835Z",
      "updatedAt": "2015-04-30T05:59:00.172Z",
      "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcm92aWRlciI6eyJlbWFpbCI6InRvbS5wZEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCR4MkRQMURQeHFWd2R1RmcwVC9MMVplNko5TlB4RTB4Y3Uxajd0SzZ3TnJnd0JEckp3SFBLZSIsImZpcnN0TmFtZSI6InZ1b25nIiwibGFzdE5hbWUiOiJuZ28iLCJhYm4iOiIzMTIxMzIiLCJhZGRyZXNzIjoiMTYgS2VhdHMgQXZlbnVlLCBLaW5nc2J1cnkiLCJzZXJ2aWNlIjpbIm1vd2luZyJdLCJsb2NhdGlvbiI6eyJ0eXBlIjoiUG9pbnQiLCJjb29yZGluYXRlcyI6WzE0NS4wMzY0NzgsLTM3LjcxODU2NF19LCJwb3N0Y29kZSI6IjMwODMiLCJ2ZXJpZmllZCI6ZmFsc2UsInN0cmlwZV9hY2NvdW50IjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAxNS0wNC0zMFQwNTo1ODo1NS44MzVaIiwidXBkYXRlZEF0IjoiMjAxNS0wNC0zMFQwNTo1ODo1NS44MzVaIiwiaWQiOiI1NTQxYzQ5ZjExYjQ5NmJiMGUyNGIyZjkifSwiaWF0IjoxNDMwMzczNTQwLCJleHAiOjE0MzA0NTk5NDB9.TfpGRXV445ORNZEL6Cww6KZNQ8RNGl9qDltL3BsgbU8",
      "id": "5541c49f11b496bb0e24b2f9"
    }
  ]
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
