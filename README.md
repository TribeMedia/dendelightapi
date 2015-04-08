# oseam Application
This is where everything regarding the application will be placed <br />
(When working on specifics like backend, frontend use branches like frontend or backend)

# How to install dependencies
Installing dependencies is simply running ```npm install``` in Terminal/Powershell

# Start server
```
sails lift
```

### User Register
POST http://localhost:1337/api/v1/user

*Required parameters: email, password*

### User Login
POST http://localhost:1337/api/v1/user_login

*Required parameters: email, password*

### User info (authorized user only)
GET http://localhost:1337/api/v1/user/:id

### All users (authorized user only)
GET http://locahost:1337/api/v1/user

### Update user (authorized user only)
PUT http://localhost:1337/api/v1/user

*Parameters: email, firstName, lastName, address*

### Provider Register
POST http://localhost:1337/api/v1/provider

*Required parameters: email, password, firstName, lastName*

### Provider Login
POST http://localhost:1337/api/v1/provider_login

*Required parameters: email, password*

### Provider info (authorized provider only)
GET http://localhost:1337/api/v1/provider/:id

### All providers (authorized provider only)
GET http://locahost:1337/api/v1/provider

### Update provider (authorized provider only)
PUT http://localhost:1337/api/v1/provider

*Parameters: email, firstName, lastName, address, service*