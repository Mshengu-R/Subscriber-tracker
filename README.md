
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
- Use JWT for safe authentications
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

# hosting
- VPS, e.g hostinger

## Best uses
- Api naming, use nouns in plural

# Components
- App.js main file for running the server
- then middleware folder with middleware soource code for global middleware function
- then models for creating database schema for how I want my data to be stored( looklike ) define it in an object
- then routes for authentication, subscription, users
- then file for connecting to the database
- services for business logic
- Arcjet for rate limitting

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

