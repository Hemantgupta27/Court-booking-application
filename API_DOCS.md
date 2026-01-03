# Cridaa Turf & Court Booking API Documentation

Base URL: `http://localhost:5000/api`

## 1. Get Available Slots
Fetch time slots for a specific court and date.

- **Endpoint**: `GET /slots`
- **Query Parameters**:
  - `courtId` (string, required): ID of the court (e.g., `c1`)
  - `date` (string, required): Date in YYYY-MM-DD format
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "c1-2024-01-01-06:00",
      "startTime": "06:00",
      "endTime": "07:00",
      "isBooked": false,
      "courtId": "c1",
      "date": "2024-01-01"
    }
  ]
}
```

## 2. Create Booking
Book a time slot.

- **Endpoint**: `POST /bookings`
- **Body**:
```json
{
  "courtId": "c1",
  "slotId": "c1-2024-01-01-06:00",
  "date": "2024-01-01",
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "userPhone": "+919999999999"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "bk-xyz123",
    "createdAt": "2024-01-01T10:00:00Z",
    ...bookingDetails
  }
}
```

## 3. Get My Bookings
Retrieve bookings for a specific user email.

- **Endpoint**: `GET /my-bookings`
- **Query Parameters**:
  - `email` (string, required): User's email address
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "bk-xyz123",
      "courtId": "c1",
      "date": "2024-01-01",
      ...
    }
  ]
}
```
