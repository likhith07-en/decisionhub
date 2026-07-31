# DecisionHub sample scaffold

This workspace now contains a minimal DecisionHub-style scaffold for:
- Backend: Spring Boot and Java
- Frontend: React with Vite
- Database: MySQL-friendly seed SQL

## Structure
- [backend](backend): Spring Boot app with sample controllers, config, and entities
- [frontend](frontend): React app with a simple dashboard route and decision card component
- [database](database): seed SQL and ER diagram notes

## Run locally

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Docker
```bash
docker compose up --build
```

The frontend should be available at http://localhost:3000 and the backend API at http://localhost:8080.
