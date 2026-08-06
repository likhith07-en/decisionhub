# DecisionHub — Backend API Module (`/backend`)

The backend microservice for **DecisionHub** is built with **Java 17**, **Spring Boot 3.2.3**, **Spring Security 6**, **Spring Data JPA**, and **MySQL 8.0**.

---

## 📁 Directory Structure

```
backend/
├── Dockerfile                  # Multi-stage Maven build + Eclipse Temurin JRE container
├── pom.xml                     # Maven build configuration and project dependencies
├── README.md                   # Backend documentation (this file)
└── src/
    └── main/
        ├── java/com/decisionhub/
        │   ├── DecisionHubApplication.java  # Spring Boot main entry point
        │   ├── config/                      # Application configs (Security, CORS, WebMvc)
        │   │   ├── AppConfig.java
        │   │   └── SecurityConfig.java
        │   ├── controller/                  # REST API Controllers
        │   │   ├── AuthController.java      # /api/auth (login, register, status)
        │   │   ├── DecisionController.java  # /api/decisions (CRUD, vote, details)
        │   │   └── UserController.java      # /api/users (profile, activity)
        │   ├── dto/                         # Data Transfer Objects & Request/Response records
        │   │   ├── AuthResponse.java
        │   │   ├── LoginRequest.java
        │   │   ├── RegisterRequest.java
        │   │   ├── UserResponse.java
        │   │   └── DecisionDto.java
        │   ├── entity/                      # JPA Entities matching Database Schema
        │   │   ├── Category.java
        │   │   ├── Decision.java
        │   │   ├── DecisionOption.java
        │   │   ├── Poll.java
        │   │   ├── PollOption.java
        │   │   ├── User.java
        │   │   ├── UserProfile.java
        │   │   └── Vote.java
        │   ├── exception/                   # Global exception handling & custom errors
        │   │   ├── ErrorResponse.java
        │   │   ├── GlobalExceptionHandler.java
        │   │   └── UserNotFoundException.java
        │   ├── repository/                  # Spring Data JPA repositories
        │   │   ├── DecisionRepository.java
        │   │   ├── PollRepository.java
        │   │   ├── UserRepository.java
        │   │   └── VoteRepository.java
        │   ├── security/                    # JWT Authentication Filter & Token Utilities
        │   │   ├── CustomUserDetailsService.java
        │   │   ├── JwtAuthenticationFilter.java
        │   │   └── JwtUtil.java
        │   └── service/                     # Business Logic Layer
        │       ├── AuthService.java
        │       ├── DecisionService.java
        │       └── UserService.java
        └── resources/
            ├── application.yml              # Spring Boot config & datasource settings
            └── db/migration/
                └── V1__init_schema.sql      # Flyway migration DDL script
```

---

## 🔐 Authentication & Security Architecture

* **Stateless JWT Tokens**: Signed with HMAC-SHA256 (`JWT_SECRET`). Tokens expire in 24 hours.
* **Password Encryption**: Stored using `BCryptPasswordEncoder` with strength 10.
* **Role-Based Access Control**:
  * `USER`: Standard decision creation, voting, and comment rights.
  * `MODERATOR`: Content review and flag resolution.
  * `ADMIN`: Platform administration and user management.

---

## 🌐 Core REST Endpoints

### 1. Authentication (`/api/auth`)
* `POST /api/auth/register` — Create a new user account.
* `POST /api/auth/login` — Authenticate credentials and receive Bearer JWT.

### 2. Decisions & Polls (`/api/decisions`)
* `GET /api/decisions` — List all published decisions with category filters.
* `GET /api/decisions/{id}` — Fetch detailed decision info, options, and poll state.
* `POST /api/decisions` — Create a new decision with attached poll options.
* `POST /api/decisions/{id}/vote` — Cast a vote on a decision option.

### 3. Users & Profile (`/api/users`)
* `GET /api/users/me` — Retrieve current authenticated profile and stats.

---

## 🛠️ Local Development & Testing

### Build with Maven
```bash
cd backend
mvn clean package -DskipTests
```

### Run Locally (Without Docker)
Ensure MySQL is running on port 3306, then:
```bash
mvn spring-boot:run
```
Service starts at: `http://localhost:8080`
