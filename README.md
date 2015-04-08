# oseam Application
This is where everything regarding the application will be placed <br />
(When working on specifics like backend, frontend use branches like frontend or backend)

# How to install dependencies
Installing dependencies is simply running ```npm install``` in Terminal/Powershell

# Start server
```
sails lift
```

# User Register
http://localhost:1337/api/v1/user
Required parameters: email, password

# User Login
http://localhost:1337/api/v1/user_login

# User info (only available with authorization header for user)
http://localhost:1337/api/v1/user/:id

# All users (only available with authorization header for user)
http://locahost:1337/api/v1/user

# Provider Register
http://localhost:1337/api/v1/provider
Required parameters: email, password

# Provider Login
http://localhost:1337/api/v1/provider_login

# Provider info (only available with authorization header for provider)
http://localhost:1337/api/v1/provider/:id

# All providers (only available with authorization header for provider)
http://locahost:1337/api/v1/provider

