# DecisionHub — Collaborative Decision-Making & Community Polling Platform

DecisionHub is a full-stack, enterprise-grade collaborative decision-making platform built according to the **Infosys Springboard Project Guidelines (`guide.pdf`)**. It empowers users to create structured decision boards, compare alternatives using multi-factor scoring, invite communities to vote, participate in threaded discussions, and analyze decision outcomes with interactive analytics.

---

## 🏗️ 1. System Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       CLIENT LAYER (Frontend)                                          │
│   • React 18 Single Page Application (Vite 5, Tailwind CSS, Framer Motion, Axios)                     │
│   • Pages: Dashboard, Analysis, Creator Analytics, Decision Creator, Poll Ballot, Profile, Support    │
│   • Theme System: Glassmorphism, Dark/Light Modes, Accent Themes (Black, Green, Saffron, Royal)        │
└───────────────────────────────────────────────────┬────────────────────────────────────────────────────┘
                                                    │ HTTPS / REST JSON (Bearer JWT)
┌───────────────────────────────────────────────────▼────────────────────────────────────────────────────┐
│                                  BACKEND LAYER (Spring Boot 3 API)                                     │
│   • Spring Boot 3.2.3 (Java 17 JRE)                                                                   │
│   • Spring Security 6 + Stateless JWT Authentication & Role-Based Access Control                       │
│   • Services: Auth, Users, Decision Management, Polling & Voting, Comments, Moderation, Analytics      │
│   • Data Access: Spring Data JPA + Hibernate ORM                                                      │
└───────────────────────────────────────────────────┬────────────────────────────────────────────────────┘
                                                    │ JDBC (Port 3306)
┌───────────────────────────────────────────────────▼────────────────────────────────────────────────────┐
│                                       DATA LAYER (MySQL / PostgreSQL)                                  │
│   • 16 Relational Tables: Users, Profiles, Categories, Communities, Members, Decisions, Options,       │
│     Comparison Factors, Option Scores, Polls, Poll Options, Votes, Comments, Notifications, Flags      │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📦 2. Project Directory Structure

```
project-setup/
├── docker-compose.yml          # Multi-container orchestration (MySQL, Backend, Frontend)
├── guide.pdf                   # Official project specification & milestone guide
├── README.md                   # Main project documentation & execution guide (this file)
│
├── database/                   # Database schemas, seeds & ER documentation
│   ├── schema.sql              # Complete DDL relational schema definitions
│   ├── README.md               # Database module documentation & table catalog
│   ├── BACKEND_MAPPING_GUIDE.md# DB Tables ↔ Spring Boot JPA Entities mapping
│   ├── er-diagram.txt          # Relational ASCII Entity Relationship Diagram
│   └── seed/
│       └── sample_data.sql     # Seed dataset (Categories, Seed Users, Example Decisions)
│
├── backend/                    # Spring Boot 3 REST API microservice
│   ├── Dockerfile              # Multi-stage Maven build + Eclipse Temurin 17 JRE
│   ├── pom.xml                 # Maven dependencies & build configuration
│   ├── README.md               # Backend architecture, controllers, services & endpoints
│   └── src/main/
│       ├── java/com/decisionhub/ # Application source code
│       │   ├── config/         # SecurityConfig, CorsConfig, AppConfig
│       │   ├── controller/     # AuthController, DecisionController, UserController
│       │   ├── dto/            # Request/Response records & DTOs
│       │   ├── entity/         # JPA entities matching database tables
│       │   ├── exception/      # GlobalExceptionHandler & custom exceptions
│       │   ├── repository/     # Spring Data JPA repositories
│       │   ├── security/       # JwtUtil, JwtAuthenticationFilter, CustomUserDetailsService
│       │   └── service/        # AuthService, DecisionService, UserService
│       └── resources/
│           ├── application.yml # Spring datasource, JWT secret, JPA settings
│           └── db/migration/   # Schema migration scripts
│
└── frontend/                   # React 18 + Vite 5 single-page application
    ├── Dockerfile              # Multi-stage Node builder + Nginx SPA runtime
    ├── nginx.conf              # Production Nginx reverse proxy & SPA router
    ├── package.json            # NPM packages & build scripts
    ├── tailwind.config.js      # Design system colors, glassmorphism tokens
    ├── vite.config.js          # Vite build & development proxy settings
    ├── README.md               # Frontend UI design, component library & routes
    └── src/
        ├── App.jsx             # Top-level routing & layout coordinator
        ├── index.css           # Global theme variables, utility classes & animations
        ├── api/                # Axios client with JWT interceptor & local storage sync
        ├── components/         # Reusable UI component library (Navbar, Sidebar, Modals, Charts)
        ├── context/            # AuthContext (user session, login, logout)
        ├── layouts/            # MainLayout page shell
        ├── pages/              # 13 Application Pages (Dashboard, Analysis, Analytics, Vote, etc.)
        ├── services/           # decisionStorage.js local persistence engine
        └── theme/              # useTheme hook for theme & UI accent switching
```

---

## 🎯 3. Modules Implemented (From `guide.pdf`)

| # | Module Name | Status | Key Features |
|---|---|:---:|---|
| **1** | **User Authentication & RBAC** | ✅ Complete | Stateless JWT auth, Login, Signup, Forgot Password, Role-Based Access (`USER`, `MODERATOR`, `ADMIN`). |
| **2** | **User Profile Management** | ✅ Complete | Profile overview, role badges, registration date, voting history. |
| **3** | **Decision Board Management** | ✅ Complete | Create decision boards, custom options, public/private visibility, seed decisions (MBA vs Job, iPhone vs Samsung, Goa vs Bali, Startup vs Corporate Job, Remote vs Office). |
| **4** | **Option Comparison System** | ✅ Complete | Multi-option pros/cons, score allocation (1-10), factor criteria (Cost, Risk, Time, Career Growth). |
| **5** | **Voting & Polling System** | ✅ Complete | Single-choice polls, real-time ballot voting, dynamic percentage distribution, duplicate vote prevention. |
| **6** | **Discussion & Feedback** | ✅ Complete | Threaded comments, feedback suggestions, expert recommendations. |
| **7** | **Decision Analytics & Analysis** | ✅ Complete | **Analysis Page** (`/analysis`) for voted decisions (Win/Loss status, vote charts); **Creator Analytics** (`/analytics`) for impressions, reach, views, votes & conversion. |
| **8** | **Notification System** | ✅ Complete | Right-rail icon sidebar notification drawer & user alerts. |
| **9** | **Community Management** | ✅ Complete | 6 Categories (Career, Education, Technology, Travel, Finance, Lifestyle), topic grouping. |
| **10**| **Moderation & Legal** | ✅ Complete | Privacy Policy, Terms & Conditions, Contact Support, moderation reporting. |
| **11**| **Containerization & Deployment**| ✅ Complete | Full Docker Compose multi-stage setup with automated health checks. |

---

## 🐳 4. Rules & Guide to Run and Learn with Docker

### ⚠️ Essential Docker Rules & Best Practices

1. **Rebuilding Containers After Code Changes**:
   * Running `docker compose restart` only stops and restarts existing containers from cached images — it **does NOT rebuild** frontend or backend code.
   * **Rule**: Whenever you modify Java code, React code, or Dockerfiles, ALWAYS run:
     ```bash
     docker compose up -d --build
     ```
   * To rebuild only the frontend:
     ```bash
     docker compose up -d --build frontend
     ```
   * To rebuild only the backend:
     ```bash
     docker compose up -d --build backend
     ```

2. **Browser Caching on Frontend Updates**:
   * Production Nginx serves cached static assets. After rebuilding the frontend container, do a **Hard Refresh** in your browser:
     * **Windows/Linux**: `Ctrl + F5` or `Ctrl + Shift + R`
     * **Mac**: `Cmd + Shift + R`
     * Or use an **Incognito / Private Window**.

3. **Container Health & Dependencies**:
   * The backend service depends on `mysql` being healthy before starting.
   * The `mysql` container uses a health check (`mysqladmin ping`).
   * Never expose production passwords in public Git commits. Use `.env` file override.

4. **Persistent Database Volumes**:
   * MySQL data is persisted inside the named volume `mysql_data`.
   * Data remains intact when restarting or rebuilding containers.
   * To wipe the database and start completely fresh:
     ```bash
     docker compose down -v
     docker compose up -d --build
     ```

---

## 🚀 5. How to Run the Project

### Option A: Complete Docker Setup (Recommended)

1. **Start all services**:
   ```bash
   docker compose up -d --build
   ```

2. **Check container status**:
   ```bash
   docker compose ps
   ```

3. **View container logs**:
   ```bash
   # All logs
   docker compose logs -f

   # Backend only
   docker compose logs -f backend

   # Frontend only
   docker compose logs -f frontend
   ```

4. **Access the Application**:
   * 🌐 **Frontend Application**: [http://localhost:3000](http://localhost:3000)
   * ⚙️ **Backend REST API**: [http://localhost:8080](http://localhost:8080)
   * 🗄️ **MySQL Database**: `localhost:3306` (`decisionhub_db`)

---

### Option B: Local Standalone Development (Without Docker)

#### 1. Start Database (MySQL)
Ensure MySQL is running on port `3306` with credentials from `application.yml` (`decisionuser` / `decisionpass`).

#### 2. Start Backend (Spring Boot)
```bash
cd backend
mvn clean compile
mvn spring-boot:run
```
Backend starts on [http://localhost:8080](http://localhost:8080).

#### 3. Start Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Frontend development server starts on [http://localhost:5173](http://localhost:5173).

---

## 🔑 6. Default User Accounts & Login Credentials

All seed and test accounts in the database are configured with password: **`Pass123`**

| User ID | Full Name | Email Address | Password | Role |
|:---:|---|---|:---:|:---:|
| **1** | Admin Principal | `admin@decisionhub.com` | `Pass123` | `ADMIN` |
| **2** | Sarah Moderator | `sarah@decisionhub.com` | `Pass123` | `MODERATOR` |
| **3** | Alex Developer | `alex@example.com` | `Pass123` | `USER` |
| **4** | Test User | `testuser@example.com` | `Pass123` | `USER` |
| **5** | Demo User | `demo@example.com` | `Pass123` | `USER` |
| **6** | Alice Smith | `alice@example.com` | `Pass123` | `USER` |
| **7** | Test User | `test@example.com` | `Pass123` | `USER` |
| **8** | Sri | `sreevidya828@gmail.com` | `Pass123` | `USER` |
| **9** | Sri Test | `sritest@example.com` | `Pass123` | `USER` |
| **10** | P LIKHITH KUMAR | `likhithkumar@gmail.com` | `Pass123` | `USER` |

---

## 📚 7. Milestone Schedule Summary (From `guide.pdf`)

* **Milestone 1 (Weeks 1 & 2)**: Requirements definition, relational database schema design, Spring Boot 3 initialization, JWT security & React skeleton.
* **Milestone 2 (Weeks 3 & 4)**: Decision board management, option comparison module, polling & voting workflows.
* **Milestone 3 (Weeks 5 & 6)**: Discussion threads, community categorization, notifications, and analytics API.
* **Milestone 4 (Weeks 7 & 8)**: Decision analysis dashboards, creator metrics reporting, containerization & deployment.
