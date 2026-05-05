## Loggings
# Winston, (INFORMATION, ERROR, AND COMBINED)
->  Stored as JSON for easy parsing
->  Timestamped for tracking when events occur
->  Rotating files (keeps last 5 files, max 5MB each)
->  Sanitized (passwords, credit cards, tokens are masked)

# API
PUT /api/v1/subscriptions/:id/cancel
Authorization: Bearer {token}

## subscription
Cancel Subscription Implementation
Features:
-> Authorization Check - Verifies user owns the subscription
-> Validation - Checks if subscription exists and isn't already cancelled
-> Status Update - Changes subscription status to 'cancelled'
-> Timestamp - Records the exact cancellation date
-> Logging - Complete audit trail of cancellation attempts
-> Error Handling - Comprehensive error messages