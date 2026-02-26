## In the schema i should not create schema for Id because the id will be made by the jsonwebtoken

## Protect the get request using middlewares
Error middleware 
- The error middleware handles the error comming from database


# The first middleware must be the one that applies to all request first (logging, security, body parsing)
# Sec place more specific middlewares and routes
# Place error handling middleware

# Rather than those while loop functions I can use middleware to make the process stops