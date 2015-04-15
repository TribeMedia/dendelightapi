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

## User CRUD (params: email, password, firstName, lastName, address, verified, apiProvider)

1. Register
	* POST: /api/v1/user
	* Parameters: email, password

2. FindOne (authorized user only)
	* GET: /api/v1/user/:id

3. FindAll (authorized user only)
	* GET: /api/v1/user

4. Update (authorized user only)
	* PUT: /api/v1/user

5. Destroy (authorized user only)
	* DELETE: /api/v1/user/:id

## Provider CRUD (params: email, password, firstName, lastName, businessName, address, service, verified, stripe_account)

1. Register
	* POST: /api/v1/provider
	* Parameters: email, password, firstName, lastName

2. FindOne (authorized provider only)
	* GET: /api/v1/provider/:id

3. FindAll (authorized provider only)
	* GET: /api/v1/provider

4. Update (authorized provider only)
	* PUT: /api/v1/provider

5. Destroy (authorized provider only)
	* DELETE: /api/v1/provider/:id

## Booking CRUD (params: userId, providerId, quoteId, service, postcode, bookTime, repeat, duration, completed)

1. Create (authorized user only)
	* POST: /api/v1/booking
	* Parameters: userId, service

2. FindOne (admin only)
	* GET: /api/v1/booking/:id

3. FindAll (admin only)
	* GET: /api/v1/booking

4. Update (authorized user only)
	* PUT: /api/v1/booking

5. Destroy (authorized user only)
	* DELETE: /api/v1/booking/:id

## Quote CRUD (params: service, price, bookingId, providerId, serviceTime, serviceDuration, accepted)

1. Create (authorized provider only)
	* POST: /api/v1/quote
	* Parameters: userId, service

2. FindOne (admin only)
	* GET: /api/v1/quote/:id

3. FindAll (admin only)
	* GET: /api/v1/quote

4. Update (authorized provider only)
	* PUT: /api/v1/quote

5. Destroy (authorized provider only)
	* DELETE: /api/v1/quote/:id

## Authentication

1. User Login
	* POST: /api/v1/user_login
	* Parameters: email, password
	* Json response: { user: {xxx}, token: xxx }

2. Provider Login
	* POST: /api/v1/provider_login
	* Parameters: email, password
	* Json response: { provider: {xxx}, token: xxx }

3. Facebook oauth
	* GET: /api/v1/auth/facebook
	* Automatic callback at: /api/v1/auth/facebook/callback
	* Json response: { user: {xxx}, token: xxx}

4. Logout
	* GET: /api/v1/logout
	* OR: simply clear token in session or local-service

## Transaction

1. View list of previous booking by user (authorized user only)
	* GET: /api/v1/user_booking_info

2. View list of quotes for service by user (authorized user only)
	* GET: /api/v1/user_quote_info

3. Accept particular quote by user (authorized user only)
	* POST: /api/v1/user_quote_accept/:id? (:id => quoteId)
	* Parameters: booking_id, provider_id

4. View queued tasks by provider (authorized provider only)
	* GET: /api/v1/provider_task

5. View queued quotes by provider (authorized provider only)
	* GET: /api/v1/provider_quote_active