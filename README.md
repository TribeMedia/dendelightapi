# oseam Application
This is where everything regarding the application will be placed <br />
(When working on specifics like backend, frontend use branches like frontend or backend)

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

## User CRUD

1. Register
	* POST: /api/v1/user
	* Parameters: email, password

2. FindOne (authorized user only)
	* GET: /api/v1/user/:id

3. FindAll (authorized user only)
	* GET: /api/v1/user

4. Update (authorized user only)
	* PUT: /api/v1/user
	* Parameters: email, firstName, lastName, address

5. Destroy (authorized user only)
	* DELETE: /api/v1/user/:id

## Provider CRUD

1. Register
	* POST: /api/v1/provider
	* Parameters: email, password, firstName, lastName

2. FindOne (authorized provider only)
	* GET: /api/v1/provider/:id

3. FindAll (authorized provider only)
	* GET: /api/v1/provider

4. Update (authorized provider only)
	* PUT: /api/v1/provider
	* Parameters: email, firstName, lastName, address, service

5. Destroy (authorized provider only)
	* DELETE: /api/v1/provider/:id

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