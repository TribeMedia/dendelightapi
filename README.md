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

## User flow 


1. Register account
  * POST: /api/v1/user
  * Required params: email, password
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

2. User Login
	* POST: /api/v1/user_login
	* Parameters: email, password
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
3. Facebook oauth
	* GET: /api/v1/auth/facebook
	* Automatic callback at: /api/v1/auth/facebook/callback
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

4. Update account
	* PUT: /api/v1/user/:id
```json
{
  "user": {
    "email": "goodbye@gmail.com",
    "password": "$2a$10$oDTKkwnz7y6QuRt26u4hjb9XjSj8mm4nzRphGUiERc0fgArFG",
    "verified": true,
    "createdAt": "2015-04-16T08:37:49.375Z",
    "updatedAt": "2015-04-16T08:37:49.375Z",
    "id": "552f74dd3917d69f0d9800ca"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImVtYWlsIjoidnVvbmduZ28ucGRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkb2dPZElEVEtrd256N3k2UXVSdDI2dTRoamI5WGpTajhtbTRuelJwaEdVaUVSYzBmZ0FyRkciLCJ2ZXJpZmllZCI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMTUtMDQtMTZUMDg6Mzc6NDkuMzc1WiIsInVwZGF0ZWRBdCI6IjIwMTUtMDQtMTZUMDg6Mzc6NDkuMzc1WiIsImlkIjoiNTUyZjc0ZGQzOTE3ZDY5ZjBkOTgwMGNhIn0sImlhdCI6MTQyOTE3MzU2MCwiZXhwIjoxNDI5MjU5OTYwfQ.5Z_FLhf7Uvv1TO5_YOWRbRE88hF094StMpdcU3pahoE"
}
```
5. Destroy account
	* DELETE: /api/v1/user/:id

6. Create booking
	* POST: /api/v1/booking
	* Params: service
```
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
7. Update (authorized user only)
	* PUT: /api/v1/booking

8. Destroy booking
	* DELETE: /api/v1/booking/:id

9. View list of previous booking by user
	* GET: /api/v1/user_booking_info

10. View list of quotes for booking
	* GET: /api/v1/user_quote_info

11. Accept particular quote
	* POST: /api/v1/user_quote_accept/:id? (:id => quoteId)
	* Params: bookingId, providerId

12. Logout
	* GET: /api/v1/logout
	* OR: simply clear token in session or local-service

## Provider flow

1. Register account
  * POST: /api/v1/provider
  * Required params: email, password, firstName, lastName, abn

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
2. Provider Login
  * POST: /api/v1/provider_login
  * Parameters: email, password
  * Json response: { provider: {xxx}, token: xxx }

```Json
{
  "provider": {
    "email": "hello@gmail.com",
    "password": "$2a$10$VJFSBiYf5IRbZN/iml4Hbux8lJ6By1kHQ0xll9KLUK4lcVNEpCfVO",
    "firstName": "Tom",
    "lastName": "Ngo",
    "verified": true,
    "stripe_account": false,
    "createdAt": "2015-04-16T09:44:58.650Z",
    "updatedAt": "2015-04-16T09:44:58.650Z",
    "id": "552f849a3917d69f0d9800cc"
  }
}
```

3. Update account
  * PUT: /api/v1/provider

4. Destroy account
  * DELETE: /api/v1/provider/:id

5. Create quote
  * POST: /api/v1/quote
  * Parameters: userId, service, price

6. Update quote
  * PUT: /api/v1/quote

7. Destroy quote
  * DELETE: /api/v1/quote/:id

8. View queued tasks by provider
  * GET: /api/v1/provider_task

9. View queued quotes by provider
  * GET: /api/v1/provider_quote_active

10. Logout
  * GET: /api/v1/logout
  * OR: simply clear token in session or local-service


## Admin flow
1. Provider Login
  * POST: /api/administrator
  * Parameters: email, password
  * Json response: { provider: {xxx}, token: xxx }

2. Find user by id
  * GET: /api/v1/user/:id

3. Find all users
  * GET: /api/v1/user

4. Find provider by id
  * GET: /api/v1/provider/:id

5. Find all providers
  * GET: /api/v1/provider

6. Find booking by id
  * GET: /api/v1/booking/:id

7. Find all bookings
  * GET: /api/v1/booking

8. Find quote by id
  * GET: /api/v1/quote/:id

9. Find all quotes
  * GET: /api/v1/quote


