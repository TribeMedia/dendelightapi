# oseam Application
* <a href="#how-to-install-dependencies">How to install & run</a>
* <a href="#online-api-test">Online API test</a>
* <a href="#location">Location</a>
* <a href="#get-different-service-information">Service Information</a>
* <a href="#user-flow">User Flow</a>
* <a href="#provider-flow">Provider Flow</a>
* <a href="#admin-flow">Admin Flow</a>

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

##### Get service duration (mowing, leaf_removal, weed_control, yard_cleaning) by size
  * Example GET: /api/v1/duration/mowing?size=20

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
	* Required params: service, size, duration, address, bookTime
  * Additional params: postcode, lat, lng, repeat
  * Json response example
```json
{
    "booking": {
        "service": "cleaning",
        "userId": "552f74dd3917d69f0d9800ca",
        "repeat": null,
        "completed": false,
        "createdAt": "2015-04-16T08:45:01.018Z",
        "updatedAt": "2015-04-16T08:45:01.018Z",
        "id": "552f768d3917d69f0d9800cb"
    }
}
```
##### Update booking
	* PUT: /api/v1/booking

##### Destroy booking
	* DELETE: /api/v1/booking/:id

##### View list of previous booking by user
	* GET: /api/v1/user_booking_info

##### View list of quotes for booking
	* GET: /api/v1/user_quote_info

##### Accept particular quote with quoteId
	* POST: /api/v1/user_quote_accept/:id?
	* Params: bookingId, providerId

##### Logout
	* GET: /api/v1/logout
	* OR: simply clear token in session or local-service

# Provider flow

##### Register account
  * POST: /api/v1/provider
  * Required params: email, password, firstName, lastName, abn, address
  * Additional params: businessName, postcode, lat, lng, service
  * Json response example
```json
{
  "provider": {
    "email": "hello@gmail.com",
    "password": "$2a$10$VJFSBiYf5IRbZN/iml4Hbux8lJ6By1kHQ0xll9KLUK4lcVNEpCfVO",
    "firstName": "Tom",
    "lastName": "Ngo",
    "abn": "xxx",
    "createdAt": "2015-04-16T09:44:58.650Z",
    "updatedAt": "2015-04-16T09:44:58.650Z",
    "id": "552f849a3917d69f0d9800cc"
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

##### Create quote
  * POST: /api/v1/quote
  * Parameters: userId, service, price

##### Update quote
  * PUT: /api/v1/quote

##### Destroy quote
  * DELETE: /api/v1/quote/:id

##### View queued tasks by provider
  * GET: /api/v1/provider_task

##### View queued quotes by provider
  * GET: /api/v1/provider_quote_active

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

##### Find quote by id
  * GET: /api/v1/quote/:id

##### Find all quotes
  * GET: /api/v1/quote

##### CRUD different services (mowing, leaf_removal, weed_control, yard_cleaning)
  * GET: /api/v1/mowing
  * POST: /api/v1/mowing (params: size, duration)
  * PUT: /api/v1/mowing
  * DELETE: /api/v1/mowing
