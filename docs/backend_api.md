# Backend API Documentation

Comprehensive guide for the CPE Fair Web Application backend API.

## 📋 Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [API Resources](#api-resources)
  - [Game](#1-game-apigame)
  - [Player](#2-player-apiplayer)
  - [Score](#3-score-apiscore)
  - [Team](#4-team-apiteam)
  - [Auth](#5-auth-apiauth)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [CORS Configuration](#cors-configuration)

---

## Overview

The backend is built with **Express.js 5.x** and **TypeScript**, using **Supabase (PostgreSQL)** for data persistence. All endpoints follow RESTful conventions and return JSON responses.

**Tech Stack:**
- Express.js 5.1.0
- TypeScript 5.9.3
- Supabase (PostgreSQL)
- Winston (Logging)
- ExcelJS (Export functionality)

---

## Base URL

**Local Development:**
```
http://localhost:3001/api
```

**Production:**
```
https://your-backend-url.vercel.app/api
```

All API endpoints are prefixed with `/api`.

---

## Authentication

The API supports two authentication strategies:

### 1. Admin Secret Key (x-admin-key)
Best for: Postman, scripts, hardware buttons, admin tools

**Header:**
```
x-admin-key: your_admin_secret_key
```

**Example:**
```bash
curl -H "x-admin-key: your_secret" http://localhost:3001/api/game
```

### 2. Supabase JWT (Bearer Token)
Best for: Frontend applications with user authentication

**Header:**
```
Authorization: Bearer <supabase_jwt_token>
```

**Example:**
```bash
curl -H "Authorization: Bearer eyJ..." http://localhost:3001/api/game
```

### Route Types

- **Public Routes** 🌐: No authentication required (Read-only operations)
- **Protected Routes** 🔒: Require admin authentication (Create, Update, Delete)

---

## API Resources

### 1. Game (`/api/game`)

Manage games available in the fair.

#### Endpoints

| Method | Endpoint | Description | Auth | Query Parameters |
|--------|----------|-------------|------|------------------|
| `GET` | `/` | List all games | 🌐 Public | `category` (optional) |
| `GET` | `/:id` | Get game by ID | 🌐 Public | - |
| `POST` | `/` | Create new game | 🔒 Admin | - |
| `PUT` | `/:id` | Update game | 🔒 Admin | - |
| `DELETE` | `/:id` | Delete game | 🔒 Admin | - |

#### Request/Response Examples

**GET /api/game**
```bash
# Get all games
curl http://localhost:3001/api/game

# Get games by category
curl http://localhost:3001/api/game?category=Sports
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid-string",
      "name": "Basketball",
      "is_group": false,
      "category": "Sports",
      "created_at": "2025-12-10T10:00:00Z"
    }
  ],
  "meta": {
    "total": 15,
    "page": 1,
    "limit": 100,
    "totalPages": 1
  }
}
```

**POST /api/game** (Admin Only)
```bash
curl -X POST http://localhost:3001/api/game \
  -H "x-admin-key: your_secret" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Basketball",
    "is_group": false,
    "category": "Sports"
  }'
```

**Request Body:**
```typescript
{
  name: string;        // Required - Game name
  is_group: boolean;   // Required - Whether it's a team game
  category: "Sports" | "Board" | "Quiz Bee" | "Esports" | "Talents" | "Mini Games"; // Required
}
```

**PUT /api/game/:id** (Admin Only)
```bash
curl -X PUT http://localhost:3001/api/game/uuid-string \
  -H "x-admin-key: your_secret" \
  -H "Content-Type: application/json" \
  -d '{"name": "3x3 Basketball"}'
```

**DELETE /api/game/:id** (Admin Only)
```bash
curl -X DELETE http://localhost:3001/api/game/uuid-string \
  -H "x-admin-key: your_secret"
```

---

### 2. Player (`/api/player`)

Manage players participating in the fair.

#### Endpoints

| Method | Endpoint | Description | Auth | Query Parameters |
|--------|----------|-------------|------|------------------|
| `GET` | `/` | List all players | 🌐 Public | `page`, `limit`, `section_team` |
| `GET` | `/:id` | Get player by ID | 🌐 Public | - |
| `POST` | `/` | Create new player | 🔒 Admin | - |
| `PUT` | `/:id` | Update player | 🔒 Admin | - |
| `DELETE` | `/:id` | Delete player | 🔒 Admin | - |

#### Request/Response Examples

**GET /api/player**
```bash
# Get all players (paginated)
curl http://localhost:3001/api/player?page=1&limit=20

# Get players by team
curl http://localhost:3001/api/player?section_team=Fontaine
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid-string",
      "full_name": "Juan Dela Cruz",
      "cys": "BSCpE-4A",
      "team_id": "team-uuid",
      "created_at": "2025-12-10T10:00:00Z",
      "team": {
        "name": "Fontaine"
      }
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

**POST /api/player** (Admin Only)
```bash
curl -X POST http://localhost:3001/api/player \
  -H "x-admin-key: your_secret" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Juan Dela Cruz",
    "cys": "BSCpE-4A",
    "team_id": "team-uuid"
  }'
```

**Request Body:**
```typescript
{
  full_name: string;     // Required - Player's full name
  cys: string;           // Required - Course, Year, Section (e.g., "BSCpE-4A")
  team_id: string;       // Optional - UUID of the team
}
```

---

### 3. Score (`/api/score`)

Manage scores and track game results.

#### Endpoints

| Method | Endpoint | Description | Auth | Query Parameters |
|--------|----------|-------------|------|------------------|
| `GET` | `/` | List all scores | 🌐 Public | `type`, `category` |
| `GET` | `/category-standings` | Get category standings | 🌐 Public | `category` |
| `GET` | `/section_team` | Get aggregated scores | 🌐 Public | `game`, `category`, `includeMiniGames` |
| `GET` | `/section_team/:team` | Get team scores | 🌐 Public | `game`, `category`, `includeMiniGames` |
| `GET` | `/ledger` | Get master ledger | 🔒 Admin | - |
| `GET` | `/export` | Export to Excel | 🔒 Admin | - |
| `POST` | `/` | Create new score | 🔒 Admin | - |
| `PUT` | `/:id` | Update score | 🔒 Admin | - |
| `DELETE` | `/:id` | Delete score | 🔒 Admin | - |

#### Request/Response Examples

**GET /api/score**
```bash
# Get all scores
curl http://localhost:3001/api/score

# Filter by category
curl http://localhost:3001/api/score?category=Sports

# Filter by type
curl http://localhost:3001/api/score?type=group
```

**GET /api/score/section_team** (Aggregated Scores)
```bash
# Get overall standings (Mini Games excluded by default)
curl http://localhost:3001/api/score/section_team

# Include Mini Games in overall standings
curl http://localhost:3001/api/score/section_team?includeMiniGames=true

# Get scores for specific category
curl http://localhost:3001/api/score/section_team?category=Sports
```

**Response:**
```json
[
  {
    "section_team": "Fontaine",
    "totalPoints": 450,
    "scores": [
      {
        "id": 123,
        "game": "Basketball",
        "category": "Sports",
        "points": 50,
        "teamName": "Fontaine",
        "contributor": "John Doe",
        "isGroup": false,
        "members": [],
        "createdAt": "2025-12-10T10:00:00Z"
      }
    ]
  }
]
```

**GET /api/score/section_team/:section_team**
```bash
# Get specific team's scores
curl http://localhost:3001/api/score/section_team/Fontaine

# Get team's scores for specific game
curl http://localhost:3001/api/score/section_team/Fontaine?game=Basketball
```

**GET /api/score/category-standings**
```bash
# Get standings for a category
curl http://localhost:3001/api/score/category-standings?category=Sports
```

**Response:**
```json
{
  "Basketball": [
    {
      "id": 123,
      "teamName": "Fontaine",
      "points": 50,
      "game": "Basketball",
      "rank": 1
    }
  ]
}
```

**POST /api/score** (Admin Only)
```bash
# Log individual score
curl -X POST http://localhost:3001/api/score \
  -H "x-admin-key: your_secret" \
  -H "Content-Type: application/json" \
  -d '{
    "teamId": "team-uuid",
    "points": 50,
    "game": "Basketball",
    "category": "Sports",
    "contributor": "John Doe",
    "isGroup": false
  }'

# Log group score
curl -X POST http://localhost:3001/api/score \
  -H "x-admin-key: your_secret" \
  -H "Content-Type: application/json" \
  -d '{
    "teamId": "team-uuid",
    "points": 100,
    "game": "Mobile Legends",
    "category": "Esports",
    "contributor": "Team Captain",
    "isGroup": true,
    "members": ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"]
  }'
```

**Request Body:**
```typescript
{
  teamId: string;        // Required - UUID of the team
  points: number;        // Required - Points to award
  game: string;          // Required - Name of the game
  category: string;      // Required - Game category
  contributor?: string;  // Optional - Name of the contributor/player
  isGroup?: boolean;     // Optional - Whether it's a group score
  members?: string[];    // Optional - Array of member names (for group scores)
}
```

**GET /api/score/export** (Admin Only - Excel Export)
```bash
curl http://localhost:3001/api/score/export \
  -H "x-admin-key: your_secret" \
  --output score_ledger.xlsx
```

Downloads an Excel file with complete score data.

---

### 4. Team (`/api/team`)

Manage teams (Genshin Impact nations).

#### Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/` | List all teams | 🌐 Public |
| `GET` | `/:id` | Get team by ID | 🌐 Public |
| `POST` | `/` | Create new team | 🔒 Admin |
| `PUT` | `/:id` | Update team | 🔒 Admin |
| `DELETE` | `/:id` | Delete team | 🔒 Admin |

#### Request/Response Examples

**GET /api/team**
```bash
curl http://localhost:3001/api/team
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid-string",
      "name": "Fontaine",
      "section_represented": "BSCpE-4A",
      "created_at": "2025-12-10T10:00:00Z"
    }
  ],
  "meta": {
    "total": 7,
    "page": 1,
    "limit": 100,
    "totalPages": 1
  }
}
```

**POST /api/team** (Admin Only)
```bash
curl -X POST http://localhost:3001/api/team \
  -H "x-admin-key: your_secret" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fontaine",
    "section_represented": "BSCpE-4A"
  }'
```

**Request Body:**
```typescript
{
  name: string;               // Required - Team name (e.g., "Fontaine")
  section_represented: string; // Required - Section/class represented
}
```

---

### 5. Auth (`/api/auth`)

Authentication endpoints for admin access.

#### Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/login` | Verify admin secret | 🌐 Public |
| `POST` | `/logout` | Logout (stateless) | 🌐 Public |

#### Request/Response Examples

**POST /api/auth/login**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"secret": "your_admin_secret"}'
```

**Request Body:**
```typescript
{
  secret: string; // The admin secret key
}
```

**Response (Success):**
```json
{
  "message": "Access granted",
  "role": "admin"
}
```

**Response (Failure):**
```json
{
  "error": "Invalid secret"
}
```

**POST /api/auth/logout**
```bash
curl -X POST http://localhost:3001/api/auth/logout
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

---

## Data Models

### Game

```typescript
interface Game {
  id: string;
  name: string;
  is_group: boolean;
  category: "Sports" | "Board" | "Quiz Bee" | "Esports" | "Talents" | "Mini Games";
  created_at: string;
}
```

### Player

```typescript
interface Player {
  id: string;
  full_name: string;
  cys: string;           // Course, Year, Section
  team_id: string | null;
  created_at: string;
  team?: {
    name: string;
  };
}
```

### Score

```typescript
interface ScoreDetails {
  contributor_name: string;
  is_group: boolean;
  members: string[];
}

interface Score {
  id: number;
  team_id: string;
  game: string;
  points: number;
  category: string;
  details: ScoreDetails;
  created_at: string;
  deleted_at?: string | null;
}
```

### Team

```typescript
interface Team {
  id: string;
  name: string;
  section_represented: string;
  created_at: string;
}
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:

### Success Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Resource deleted successfully

### Error Codes

- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or invalid credentials
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

### Error Response Format

```json
{
  "error": "Error message describing what went wrong"
}
```

**Examples:**

```json
// 401 Unauthorized
{
  "error": "Access Denied: Celestia Security Protocol Engaged 🔒"
}

// 404 Not Found
{
  "error": "Game not found"
}

// 400 Bad Request
{
  "error": "Missing required field: name"
}
```

---

## CORS Configuration

The backend allows requests from:

**Allowed Origins:**
- `http://localhost:3000` (Local development)
- `https://cpefair2025.vercel.app` (Production frontend)

**CORS Headers:**
- Credentials: Enabled
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: Content-Type, Authorization, x-admin-key

---

## Best Practices

### Pagination

For endpoints that return lists, use pagination:

```bash
GET /api/player?page=1&limit=20
```

### Filtering

Use query parameters for filtering:

```bash
GET /api/game?category=Sports
GET /api/score?type=group
```

### Mini Games Handling

By default, Mini Games are **excluded** from overall rankings. To include them:

```bash
GET /api/score/section_team?includeMiniGames=true
```

### Error Handling in Client Code

```javascript
try {
  const response = await fetch('http://localhost:3001/api/game');
  if (!response.ok) {
    const error = await response.json();
    console.error('Error:', error.error);
  }
  const data = await response.json();
} catch (err) {
  console.error('Network error:', err);
}
```

### Authentication Example

```javascript
// Using x-admin-key
const response = await fetch('http://localhost:3001/api/game', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-admin-key': 'your_admin_secret'
  },
  body: JSON.stringify({
    name: 'Basketball',
    is_group: false,
    category: 'Sports'
  })
});
```

---

## Logging

The backend uses **Winston** for logging:

- Development: Detailed console logs
- Production: Structured JSON logs

**Log Levels:**
- `error` - Error conditions
- `warn` - Warning conditions
- `info` - Informational messages
- `debug` - Debug-level messages (dev only)

---

## Environment Variables

Required environment variables:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Authentication
ADMIN_SECRET=your_admin_secret_key

# Server Configuration
PORT=3001
NODE_ENV=development
```

---

## Support

For issues or questions:

- **Repository**: [github.com/Toksdubu/cpe_fair_web](https://github.com/Toksdubu/cpe_fair_web)
- **Issues**: [Submit an issue](https://github.com/Toksdubu/cpe_fair_web/issues)

---

**Last Updated**: December 10, 2025  
**API Version**: 1.0.0
