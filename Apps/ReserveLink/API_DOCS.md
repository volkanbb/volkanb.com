# API Endpoints & Example Requests

## Authentication

### Login
**POST** `/api/auth/login`
```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```

### Register
**POST** `/api/auth/register`
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword",
  "role": "customer"
}
```

## Customer Endpoints

### List Services
**GET** `/api/customer/services?page=1&search=consult`

### List Slots
**GET** `/api/customer/services/1/slots?date=2026-04-14`

### Create Reservation
**POST** `/api/customer/reservations`
**Auth Required**
```json
{
  "service_id": 1,
  "slot_id": 5,
  "note": "Looking forward to it!"
}
```

## Admin Endpoints

### Manage Services (Create)
**POST** `/api/admin/services`
**Admin Required**
```json
{
  "name": "New Premium Service",
  "description": "High-end consultation",
  "duration": 60
}
```

### View Logs
**GET** `/api/admin/logs?page=1&search=CREATE AND reservation`
**Admin Required**

### Update Reservation Status
**POST** `/api/admin/reservations/1/status`
**Admin Required**
```json
{
  "status": "approved"
}
```
