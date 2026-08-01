# DecisionHub - Collaborative Decision-Making Platform

DecisionHub is an enterprise-grade collaborative decision-making platform built with **Java 17/21 (Spring Boot 3)**, **MySQL**, **Flyway**, **Spring Security (JWT)**, **Swagger OpenAPI**, **React 19**, **Vite**, **Tailwind CSS**, and **Docker**.

---

## 🛠️ Architecture & Package Structure

### Backend Structure (`backend/src/main/java/com/decisionhub`)
- **`config/`**: `CorsConfig.java`, `SecurityConfig.java`, `SwaggerConfig.java`
- **`controller/`**: `AuthController.java`, `UserController.java`, `DecisionController.java`, `PollController.java`, `VoteController.java`
- **`dto/`**: `RegisterRequest.java`, `LoginRequest.java`, `AuthResponse.java`, `DecisionRequest.java`, `DecisionResponse.java`, `PollRequest.java`, `PollResponse.java`, `VoteRequest.java`, `VoteResponse.java`, `VoteResultResponse.java`, `UserResponse.java`
- **`entity/`**: `User.java`, `Decision.java`, `Poll.java`, `Option.java`, `Vote.java`, `Role.java`, `DecisionStatus.java`
- **`repository/`**: `UserRepository.java`, `DecisionRepository.java`, `PollRepository.java`, `OptionRepository.java`, `VoteRepository.java`
- **`service/`**: `UserService.java`, `DecisionService.java`, `PollService.java`, `VoteService.java`
- **`security/`**: `JwtUtil.java`, `JwtFilter.java`, `CustomUserDetailsService.java`
- **`exception/`**: `GlobalExceptionHandler.java`, `UserNotFoundException.java`, `DecisionNotFoundException.java`, `PollNotFoundException.java`, `DuplicateVoteException.java`, `ErrorDetails.java`

---

## 🚀 Running with Docker Compose

To start the full stack (MySQL + Spring Boot Backend + React Frontend):

```bash
docker-compose up --build
```

Access services at:
- **Frontend App**: `http://localhost:5173`
- **Backend REST API**: `http://localhost:8080`
- **Swagger OpenAPI Docs**: `http://localhost:8080/swagger-ui/index.html`

---

## 💻 Running Locally

### 1. Backend Setup
Make sure MySQL is running locally on port `3306` with database `decisionhub_db`.

```bash
cd backend
mvn clean compile
mvn spring-boot:run
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
