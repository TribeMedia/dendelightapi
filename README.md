# oseam Application
API

# How to install dependencies
Installing dependencies is simply running ```npm install``` in Terminal/Powershell

# Start server
```
sails lift
```
```
To access authorize location, set Authorization header with *'Bearer' + token* .
```
# Online API test
http://oseam.herokuapp.com

# User flow 


##### Register account
  * POST: /api/v1/user
  * Required params: email, password
  * Json response example

```json
{
  "user": {
    "email": "hello@gmail.com",
    "password": "$2a$10$oDTKkwnz7y6QuRt26u4hjb9XjSj8mm4nzRphGUiERc0fgArFG",
    "verified": false,
    "createdAt": "2015-04-16T08:37:49.375Z",
    "updatedAt": "2015-04-16T08:37:49.375Z",
    "id": "552f74dd3917d69f0d9800ca"
  }
}
```

##### User Login
	* POST: /api/v1/user_login
	* Parameters: email, password
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
	* Params: service
  * Json response example

```Json
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
##### Update (authorized user only)
	* PUT: /api/v1/booking

##### Destroy booking
	* DELETE: /api/v1/booking/:id

##### View list of previous booking by user
	* GET: /api/v1/user_booking_info

##### View list of quotes for booking
	* GET: /api/v1/user_quote_info

##### Accept particular quote
	* POST: /api/v1/user_quote_accept/:id? (:id => quoteId)
	* Params: bookingId, providerId

##### Logout
	* GET: /api/v1/logout
	* OR: simply clear token in session or local-service

# Provider flow

##### Register account
  * POST: /api/v1/provider
  * Required params: email, password, firstName, lastName, abn
  * Json response example

```Json
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
```Json
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
}```

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


# Admin flow
##### Provider Login
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


