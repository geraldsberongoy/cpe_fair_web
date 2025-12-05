# Backend API Developer Guide

This guide provides an overview of the backend API endpoints, their purposes, and how to use them.

## Base URL
All API endpoints are prefixed with `/api`.
Example: `http://localhost:8000/api/game`

## Authentication
- **Public Routes**: Accessible by anyone (Read-only operations).
- **Protected Routes**: Require Admin privileges (Create, Update, Delete operations).
  - These routes typically require a valid Bearer token in the `Authorization` header.

---

## Resources

### 1. Game (`/api/game`)
Manage the games available in the fair.

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | List all games | Public |
| `GET` | `/:id` | Get details of a specific game | Public |
| `POST` | `/` | Create a new game | Admin |
| `PUT` | `/:id` | Update an existing game | Admin |
| `DELETE` | `/:id` | Delete a game | Admin |

#### Payloads

**Create/Update Game**
```json
{
  "name": "Basketball",       // Required
  "is_group": true,           // Optional (Default: false)
  "icon": "🏀"                // Optional
}
```

---

### 2. Player (`/api/player`)
Manage players participating in the fair.

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | List all players | Public |
| `GET` | `/:id` | Get details of a specific player | Public |
| `POST` | `/` | Create a new player | Admin |
| `PUT` | `/:id` | Update an existing player | Admin |
| `DELETE` | `/:id` | Delete a player | Admin |

#### Payloads

**Create/Update Player**
```json
{
  "full_name": "John Doe",    // Required
  "cys": "BSCpE-4A",          // Required (Course, Year, Section)
  "team_id": "uuid-string"    // Optional (UUID of the team)
}
```

---

### 3. Score (`/api/score`)
Manage scores and points awarded to teams.

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | List all scores | Public |
| `GET` | `/section_team` | Get aggregated scores by section team | Public |
| `GET` | `/section_team/:section_team` | Get scores for a specific section team | Public |
| `POST` | `/` | Create a new score entry | Admin |
| `PUT` | `/:id` | Update a score entry | Admin |
| `DELETE` | `/:id` | Delete a score entry | Admin |

#### Payloads

**Create/Update Score**
```json
{
  "teamId": "uuid-string",    // Required
  "points": 10,               // Required
  "game": "Basketball",       // Required
  "contributor": "Jane Doe",  // Optional
  "isGroup": false,           // Optional
  "members": ["Player 1"]     // Optional (if isGroup is true)
}
```

---

### 4. Team (`/api/team`)
Manage the teams (e.g., houses or groups) in the fair.

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | List all teams | Public |
| `GET` | `/:id` | Get details of a specific team | Public |
| `POST` | `/` | Create a new team | Admin |
| `PUT` | `/:id` | Update an existing team | Admin |
| `DELETE` | `/:id` | Delete a team | Admin |

#### Payloads

**Create/Update Team**
```json
{
  "name": "Red Dragons",      // Required
  "color": "bg-red-500"       // Optional (Tailwind class or hex)
}
```
