# API Documentation — macommune

Base URL: `http://localhost:3001/api`

## Authentication

### POST /auth/login
Login with email and password to get JWT token.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "abc123",
    "email": "admin@example.com",
    "full_name": "Admin User",
    "role": "admin"
  }
}
```

**Error (401 Unauthorized):**
```json
{
  "error": "Invalid email or password"
}
```

### POST /auth/register
Register a new user (requires database).

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "John Doe"
}
```

**Response (201 Created):** Same as login

### GET /auth/verify
Verify token validity.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "valid": true,
  "user": {
    "userId": "abc123",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

## News Articles

### GET /api/NewsArticle
List all published news articles.

**Query Parameters:**
- `sort`: `-created_date` (descending) or `created_date` (ascending)

**Response:**
```json
[
  {
    "id": "abc123",
    "title": "Nouvelle campagne",
    "content": "...",
    "excerpt": "...",
    "category": "terrain",
    "canton": "figuil",
    "published": true,
    "image_url": "https://...",
    "created_date": "2026-05-07T10:30:00Z"
  }
]
```

### POST /api/NewsArticle
Create a new article (requires editor+ role).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "title": "Nouvelle campagne",
  "content": "Description complète...",
  "excerpt": "Court résumé",
  "image_url": "https://example.com/image.jpg",
  "category": "terrain",
  "canton": "tous",
  "published": true
}
```

**Response (201 Created):** Same as GET item

### PUT /api/NewsArticle/:id
Update an article (requires editor+ role).

**Request:** Same fields as POST (all optional)

**Response (200 OK):** Updated article

### DELETE /api/NewsArticle/:id
Delete an article (requires editor+ role).

**Response (200 OK):**
```json
{
  "success": true
}
```

---

## Supporters

### GET /api/Supporter
List all supporters.

**Query Parameters:**
- `sort`: Field name to sort by

**Response:**
```json
[
  {
    "id": "xyz789",
    "full_name": "Jean Dupont",
    "phone": "+237699123456",
    "email": "jean@example.com",
    "canton": "biou",
    "sector": "Éducation",
    "notes": "Important contact",
    "created_date": "2026-05-07T10:00:00Z"
  }
]
```

### POST /api/Supporter
Create a new supporter (requires editor+ role).

**Request:**
```json
{
  "full_name": "Jean Dupont",
  "phone": "+237699123456",
  "email": "jean@example.com",
  "canton": "biou",
  "sector": "Éducation",
  "notes": "Important contact"
}
```

---

## Testimonials

### GET /api/Testimonial
List all testimonials.

**Response:**
```json
[
  {
    "id": "test123",
    "author_name": "Marie Dupont",
    "author_title": "Directrice d'école",
    "content": "Emmanuel est un excellent candidat...",
    "canton": "lam",
    "created_date": "2026-05-07T10:00:00Z"
  }
]
```

### POST /api/Testimonial
Create a testimonial (requires editor+ role).

**Request:**
```json
{
  "author_name": "Marie Dupont",
  "author_title": "Directrice d'école",
  "content": "Emmanuel est un excellent candidat...",
  "canton": "lam"
}
```

---

## Events

### GET /api/Evenement
List all published events.

**Response:**
```json
[
  {
    "id": "event123",
    "title": "Grand Rassemblement",
    "description": "...",
    "event_date": "2026-06-15T14:00:00Z",
    "location": "Stade Municipal",
    "canton": "figuil",
    "image_url": "https://...",
    "published": true,
    "created_date": "2026-05-07T10:00:00Z"
  }
]
```

### POST /api/Evenement
Create an event (requires editor+ role).

**Request:**
```json
{
  "title": "Grand Rassemblement",
  "description": "Description complète...",
  "event_date": "2026-06-15T14:00:00Z",
  "location": "Stade Municipal",
  "canton": "tous",
  "image_url": "https://...",
  "published": true
}
```

---

## Badges

### GET /api/Badge
List all badges.

**Response:**
```json
[
  {
    "id": "badge123",
    "email": "user@example.com",
    "name": "Campaign Supporter",
    "activated": true,
    "created_date": "2026-05-07T10:00:00Z"
  }
]
```

### POST /api/Badge
Create a badge (requires editor+ role).

**Request:**
```json
{
  "email": "user@example.com",
  "name": "Campaign Supporter",
  "activated": false
}
```

---

## Donations

### POST /api/donations/initiate
Initiate a payment via Camoo Pay.

**Request:**
```json
{
  "amount": 5000,
  "phone_number": "+237699123456",
  "donor_name": "Jean Dupont",
  "message": "Support pour la campagne"
}
```

**Response (201 Created):**
```json
{
  "transaction_id": "txn_abc123",
  "external_reference": "don-foka-1715077200",
  "status": "PENDING",
  "amount": 5000,
  "network": "MTN"
}
```

### GET /api/donations/verify?id=txn_abc123
Check donation status.

**Response:**
```json
{
  "status": "successful",
  "amount": 5000,
  "network": "MTN"
}
```

---

## Pages (CMS)

### GET /api/pages/:pageKey
Get content for a specific page.

**Response:**
```json
{
  "about": {
    "hero": "Qui est Emmanuel Foka?",
    "content": "...",
    "values": ["Intégrité", "Justice"]
  }
}
```

### PUT /api/pages/:pageKey
Update page content (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "hero": "New hero text",
  "content": "New content",
  "values": ["Updated values"]
}
```

---

## Error Responses

**400 Bad Request:**
```json
{
  "error": "Validation failed",
  "details": [
    "title: is required",
    "amount: must be >= 500"
  ]
}
```

**401 Unauthorized:**
```json
{
  "error": "Invalid or expired token"
}
```

**403 Forbidden:**
```json
{
  "error": "Admin access required"
}
```

**404 Not Found:**
```json
{
  "error": "Record not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Server error message"
}
```

---

## User Roles

- **admin**: Full access (create, edit, delete, manage pages, manage users)
- **editor**: Can create, edit, delete content (articles, events, supporters, etc.)
- **viewer**: Read-only access to all content

## Default Admin User (SQL mode)

When using PostgreSQL, run migrations and seeders to create the default admin:

```bash
npm run db:seed
```

**Credentials:**
- Email: `admin@macommune.cm`
- Password: `ChangeMe123!`
