
# Subscription tracker
- Handles real logic
- real Money

# Backend
- Node JavaScript
- Express framework
- npx eslint(for kepping our codebase clean)
- Mongodb

## Arcitechture
* Monolithic
- All components of application are in the same unified code
* * * Handles Everything 
- User management
- Business logic
- And database interaction


# Features
- Use JWT for safe authentications (Soon to use https for safe fetching)
- Mongodb and mongoose for database
- Intergrate with ORS
- Use crud operations
- And also structure the API for communicating with front-end
- Advance rate limit and secure API using arcjet
- Database modelling mongoose and schema
- Efficient crud operation for Subscription management
- Global error handling middleware
- Input validation
- And middleware intergration implimenting loggin mechanism for better debugging and maintanance

# Deployment
- Render

## ROLES (Yet to be implimented)
- Admins - they can access everything include checking mangersa and user activities
  also they can choose what to store in the database for the users
  Suspend / deactivate accounts
  
- Managers - they can access user activities

- users - subscribe and check subscription


# Components
- App.js main file for running the server
- then middleware folder with middleware soource code for global middleware function
- then models for creating database schema for how I want my data to be stored( looklike ) define it in an object
- then routes for authentication, subscription, users
- then file for connecting to the database
- services for business logic
- Arcjet for rate limitting

## Endpoints (RESTFUL API)
Auth endpoints
- for SignUp -> POST /api/v1/auth/sign-up
- for SignIn -> POST /api/v1/auth/sign-in
- for SignOut -> POST /api/v1/auth/sign-out

User endpoints
- for getting the user profile -> PUT /api/v1/users/:id
- for updating the users -> GET /api/v1/users/:id/update
- for deleting user -> POST /api/v1/users/:id/delete

Subscription endpoints  ->  Soon to impliment Graph QL for proper API queries and mutations
- for listing all the subscriptions -> GET /api/v1/subscriptions
- for creating the subscription -> GET /api/v1/subscriptions
- for updating the subscription -> PUT /api/v1/subscriptions/:id
- for deleting the subscription -> DELETE /api/v1/subscriptions/:id

 ## Models Use schema for defining how/what our data should looklike
- Schema objects
1 User schema
- Name
    |- string
    |- required
    |- No spaces
    |- minimum length should be at least 2 characters
    |- Max be 15

- email
    |- One user can have one email(unique)
    |- required
    |- no unnecessary space
    |- lowercase
    |- validate

- Password
  |- String
  |- unique
  |- minimum length should be 6

  timestamp helps us to know when the user has been created or modified

  So then we create model using off of that schema 

2 Subscription schema

- name
- price
- currency
- frequency ( for )
- category

## WORKFLOWS 
- for reminding the user about the renewal of the subscription
