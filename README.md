# 🎮 CPE Fair Web Application

A comprehensive web-based game leaderboard and event management system designed for the CPE (Computer Engineering) Fair, featuring an immersive **Genshin Impact** theme with stunning visuals and interactive elements.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black)
![Express](https://img.shields.io/badge/Express-5.1.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Project Overview

The **CPE Fair Web Application** is a full-stack event management platform built to streamline game competitions, track team scores, and display real-time leaderboards. Designed with a captivating Genshin Impact aesthetic, the platform brings together seven nations (teams) competing across various game categories.

### Main Purpose

- Manage competitive gaming events with multiple teams
- Track scores across different game categories (Sports, Esports, Brain Games, Mini Games, etc.)
- Display live leaderboards with podium rankings
- Provide an admin dashboard for managing games, players, teams, and scores
- Export comprehensive score reports to Excel

### Key Functionality

- **Real-time Leaderboards**: View overall standings and category-specific rankings
- **Team Management**: Seven Genshin Impact-themed teams (Fontaine, Inazuma, Liyue, Mondstadt, Natlan, Sumeru, Snezhnaya)
- **Score Tracking**: Log individual and group game scores with detailed participant information
- **Admin Panel**: Complete CRUD operations for games, players, teams, and scores
- **Data Export**: Generate Excel reports with master score ledgers

---

## ✨ Features

### 🎮 User-Facing Features

- **Interactive Leaderboards**
  - Overall standings with podium display for top 3 teams
  - Category-specific leaderboards (Sports, Esports, Brain Games, Mini Games)
  - Individual game rankings with team-based scoring
  - Conditional rendering: displays all teams even with 0 points
- **Genshin Impact Theme**

  - Seven nation-themed backgrounds (Fontaine, Inazuma, Liyue, Mondstadt, Natlan, Sumeru, Snezhnaya)
  - Animated starry backgrounds and golden border designs
  - Gradient text effects and hover animations
  - Nation-specific color schemes and visual effects

- **Game Schedule Viewer**
  - View game schedules by category
  - Interactive game cards with bracketing and schedule information

### 🔧 Admin Features

- **Comprehensive Dashboard**
  - Overview statistics (total games, players, teams, scores)
  - Real-time data visualization
- **Game Management**
  - Create, edit, and delete games
  - Set game categories and group/solo modes
  - Quick score entry directly from game cards
- **Player Registry**
  - Add and edit player information (name, CYS, team affiliation)
  - Filter and search players by team
  - Bulk player management
- **Score Management**
  - Log scores for individual or group games
  - Edit and delete score entries
  - View scores by game or team
  - Contributor tracking
- **Team Management**
  - Configure team sections and representatives
  - View team-specific statistics
- **Settings & Configuration**
  - Admin authentication with secret key
  - Export master score ledger to Excel
  - System configuration options

### 🚀 Technical Features

- Full-stack TypeScript implementation
- Server-side rendering with Next.js
- RESTful API architecture
- Real-time data synchronization with TanStack Query
- Responsive design (mobile, tablet, desktop)
- PostgreSQL database with Supabase
- Authentication middleware for admin routes
- Optimistic UI updates
- Excel export functionality with ExcelJS
- Comprehensive error handling and logging

---

## 🛠️ Technologies Used

### Frontend

| Technology         | Version | Purpose                              |
| ------------------ | ------- | ------------------------------------ |
| **Next.js**        | 16.0.7  | React framework with SSR and routing |
| **React**          | 19.2.1  | UI library                           |
| **TypeScript**     | 5.x     | Type-safe development                |
| **TanStack Query** | 5.90.11 | Server state management and caching  |
| **TanStack Table** | 8.21.3  | Advanced table functionality         |
| **Tailwind CSS**   | 4.x     | Utility-first CSS framework          |
| **Radix UI**       | -       | Accessible component primitives      |
| **Axios**          | 1.13.2  | HTTP client                          |
| **Lucide React**   | 0.555.0 | Icon library                         |
| **date-fns**       | 4.1.0   | Date manipulation                    |
| **xlsx**           | 0.18.5  | Excel file generation                |
| **react-toastify** | 11.0.5  | Toast notifications                  |

### Backend

| Technology     | Version | Purpose                                  |
| -------------- | ------- | ---------------------------------------- |
| **Express.js** | 5.1.0   | Web framework                            |
| **TypeScript** | 5.9.3   | Type-safe development                    |
| **Supabase**   | 2.81.1  | PostgreSQL database and backend services |
| **Winston**    | 3.18.3  | Logging library                          |
| **ExcelJS**    | 4.4.0   | Excel file generation                    |
| **CORS**       | 2.8.5   | Cross-origin resource sharing            |
| **dotenv**     | 17.2.3  | Environment variable management          |

### Development Tools

- **tsx** - TypeScript execution for development
- **ESLint** - Code linting
- **Babel React Compiler** - Optimized React compilation

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control
- **Supabase Account** - [Sign up](https://supabase.com/) for database services

### 1. Clone the Repository

```bash
git clone https://github.com/geraldsberongoy/cpe_fair_web.git
cd cpe_fair_web
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

### Backend Configuration

Create a `.env` file in the `backend` directory:

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

**How to get Supabase credentials:**

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the **Project URL** (SUPABASE_URL)
5. Copy the **service_role** key (SUPABASE_SERVICE_ROLE_KEY)

### Frontend Configuration

Create a `.env.local` file in the `frontend` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

For production, update the API URL to your deployed backend URL.

---

## 🚀 Running the Application

### Development Mode

#### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:3001`

#### 2. Start the Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### Production Build

#### Backend

```bash
cd backend
npm run build
npm start
```

#### Frontend

```bash
cd frontend
npm run build
npm start
```

---

## 📁 Project Structure

```
cpe-fair/
├── backend/
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── game.controller.ts
│   │   │   ├── player.controller.ts
│   │   │   ├── score.controller.ts
│   │   │   └── team.controller.ts
│   │   ├── lib/                  # External service integrations
│   │   │   └── supabaseClient.ts
│   │   ├── middlewares/          # Authentication & validation
│   │   │   └── auth.ts
│   │   ├── routes/               # API route definitions
│   │   │   ├── auth.routes.ts
│   │   │   ├── game.routes.ts
│   │   │   ├── player.routes.ts
│   │   │   ├── score.routes.ts
│   │   │   └── team.routes.ts
│   │   ├── types/                # TypeScript type definitions
│   │   │   ├── game.ts
│   │   │   ├── player.ts
│   │   │   ├── score.ts
│   │   │   └── team.ts
│   │   ├── utils/                # Utility functions
│   │   │   └── logger.ts
│   │   └── index.ts              # Express server setup
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/                  # Next.js app router
│   │   │   ├── admin/            # Admin panel pages
│   │   │   │   ├── games/
│   │   │   │   ├── overview/
│   │   │   │   ├── registry/
│   │   │   │   └── settings/
│   │   │   ├── schedule/         # Game schedule views
│   │   │   ├── page.tsx          # Landing page
│   │   │   └── layout.tsx
│   │   ├── components/           # React components
│   │   │   ├── admin/            # Admin-specific components
│   │   │   │   ├── GameCard.tsx
│   │   │   │   ├── GameModal.tsx
│   │   │   │   ├── QuickScoreModal.tsx
│   │   │   │   ├── player/
│   │   │   │   └── score/
│   │   │   ├── landing/          # Public-facing components
│   │   │   │   ├── leaderboard.tsx
│   │   │   │   ├── Podium.tsx
│   │   │   │   ├── CategoriesBar.tsx
│   │   │   │   └── BorderDesign.tsx
│   │   │   ├── ui/               # Reusable UI components
│   │   │   └── StarryBackground.jsx
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── useGame.ts
│   │   │   ├── usePlayer.ts
│   │   │   ├── useScore.ts
│   │   │   └── useTeams.ts
│   │   ├── services/             # API service layers
│   │   │   ├── api.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── game.service.ts
│   │   │   ├── player.service.ts
│   │   │   ├── score.service.ts
│   │   │   └── team.service.ts
│   │   ├── types/                # TypeScript interfaces
│   │   ├── assets/               # Images and fonts
│   │   │   └── images/
│   │   │       └── backgrounds/  # Genshin Impact nation themes
│   │   └── lib/                  # Utility functions
│   ├── public/                   # Static assets
│   ├── package.json
│   └── next.config.ts
│
├── docs/                         # Documentation
│   └── backend_api.md            # API reference
├── management/                   # Project management files
└── README.md                     # This file
```

---

## 📚 API Documentation

Detailed API documentation is available in [`docs/backend_api.md`](docs/backend_api.md).

### Quick Reference

**Base URL:** `http://localhost:3001/api`

#### Public Endpoints

- `GET /game` - List all games
- `GET /player` - List all players
- `GET /team` - List all teams
- `GET /score` - List all scores
- `GET /score/section_team` - Get aggregated team scores

#### Admin Endpoints (Requires `x-admin-key` header)

- `POST /game` - Create game
- `PUT /game/:id` - Update game
- `DELETE /game/:id` - Delete game
- `POST /player` - Create player
- `POST /score` - Log score
- `PUT /score/:id` - Update score
- `DELETE /score/:id` - Delete score

### Query Parameters

- `?category=Sports` - Filter by game category
- `?includeMiniGames=true` - Include Mini Games in overall rankings (default: false)
- `?sortBy=points` - Sort scores by field

---

## 💻 Usage

### Accessing the Application

1. **Open your browser** and navigate to `http://localhost:3000`
2. **Browse the leaderboards** - View overall standings and category-specific rankings
3. **Explore game schedules** - Check game timings and brackets
4. **View team details** - Click on team cards to see detailed score breakdowns

### Admin Panel Access

1. Navigate to `http://localhost:3000/admin`
2. Enter the admin secret key (configured in `.env`)
3. Access the dashboard to manage:
   - **Games**: Create, edit, and delete games with quick score entry
   - **Players**: Manage player registry and team assignments
   - **Scores**: Log, edit, and delete score entries
   - **Settings**: Export data and configure system settings

### Managing Games

1. Go to **Admin** → **Games**
2. Click **"Add New Game"** to create a game
3. Fill in game details (name, category, group/solo mode)
4. Use the **"Add Score"** button for quick score entry
5. Edit or delete games as needed

### Logging Scores

**Method 1: Quick Score Entry (from Games page)**

1. Go to **Admin** → **Games**
2. Click the **"Add Score"** button on any game card
3. Select team/player and enter score details

**Method 2: Score Management Page**

1. Go to **Admin** → **Manage Scores**
2. Click **"Log New Score"**
3. Select game, team/player, and enter points
4. For group games, add multiple participants

### Exporting Data

1. Go to **Admin** → **Settings**
2. Click **"Export Master Score Ledger"**
3. Excel file will be downloaded with complete score data

### Viewing Leaderboards

- **Overall**: View all teams ranked by total points (Mini Games excluded by default)
- **Categories**: Filter by Sports, Esports, Brain Games, or Mini Games
- **Individual Games**: Click on any game to see team rankings for that specific game
- **Team Details**: Click on team cards to view detailed score breakdowns and participants

---

## 🤝 Contributing

We welcome contributions to the CPE Fair Web Application! Here's how you can help:

### Reporting Issues

1. Check if the issue already exists in [GitHub Issues](https://github.com/geraldsberongoy/cpe_fair_web/issues)
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Submitting Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Make your changes**
   - Follow existing code style
   - Add TypeScript types
   - Update documentation if needed
4. **Test thoroughly**
   - Test in development mode
   - Check for console errors
   - Verify responsive design
5. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feat/your-feature-name
   ```
7. **Open a Pull Request**
   - Provide clear description of changes
   - Reference related issues
   - Include screenshots for UI changes

### Development Guidelines

- Use TypeScript for type safety
- Follow existing naming conventions
- Write meaningful commit messages (conventional commits)
- Keep components modular and reusable
- Add comments for complex logic
- Test on multiple screen sizes
- Ensure accessibility standards

### Code Style

- **Frontend**: Follow Next.js and React best practices
- **Backend**: Use Express.js conventions
- **Formatting**: Run `npm run lint` before committing
- **Types**: Always define TypeScript interfaces

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 CPE Fair Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

### Design & Theme

This project proudly features the **Genshin Impact** theme, drawing inspiration from the beloved game by **miHoYo/HoYoverse**. We acknowledge and respect their original creative work:

- **Visual Aesthetics**: The seven nation themes (Fontaine, Inazuma, Liyue, Mondstadt, Natlan, Sumeru, Snezhnaya) are inspired by Genshin Impact's world design
- **Color Schemes**: Golden accents, nation-specific color palettes, and gradient effects
- **Background Imagery**: Nation-themed backgrounds that capture the essence of each region
- **UI Elements**: Ornamental borders, starry effects, and elegant typography inspired by the game's visual language

**Disclaimer**: This project is a fan-made application for educational and event management purposes. It is not officially affiliated with, endorsed by, or connected to miHoYo/HoYoverse or Genshin Impact. All Genshin Impact-related imagery, themes, and references are the property of their respective owners.

### Technologies & Resources

- **Next.js Team** - For the amazing React framework
- **Vercel** - For Next.js development and deployment tools
- **Supabase Team** - For the excellent PostgreSQL database platform
- **TanStack** - For React Query and Table libraries
- **Radix UI** - For accessible component primitives
- **Tailwind CSS Team** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon library

### Community & Contributors

- **CPE Fair Organizing Team** - For the opportunity to build this platform
- **Open Source Community** - For the incredible tools and libraries that made this project possible
- **Beta Testers** - For valuable feedback during development

### Special Thanks

- All contributors who have helped improve this project
- The React and TypeScript communities for excellent documentation
- Stack Overflow community for troubleshooting assistance
- GitHub for hosting and version control services

---

## 📞 Contact & Support

- **Repository**: [github.com/geraldsberongoy/cpe_fair_web](https://github.com/geraldsberongoy/cpe_fair_web)
- **Issues**: [Submit an issue](https://github.com/geraldsberongoy/cpe_fair_web/issues)
- **Discussions**: [Join the discussion](https://github.com/geraldsberongoy/cpe_fair_web/discussions)

<div align="center">

**Built with ❤️ by the CPE Fair Development Team**

_Powered by Genshin Impact's timeless aesthetics_

[⬆ Back to Top](#-cpe-fair-web-application)

</div>
