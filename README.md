# Project Name

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React.js, React Router, Axios, Tailwind CSS, Chart.js |
| Backend | Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate |
| Database | MySQL (local dev), PostgreSQL (production) |
| Auth | JWT, OAuth2 (Google Login) |
| Notifications | JavaMailSender (email), Firebase Cloud Messaging (push) |
| Testing | JUnit, Mockito, Postman, React Testing Library |
| DevOps | Docker, Docker Compose, GitHub Actions, AWS/Render/Railway |

## What you need installed (that's it — Docker handles the rest)
1. **Git** — https://git-scm.com
2. **Docker Desktop** — https://www.docker.com/products/docker-desktop
3. **VS Code** — https://code.visualstudio.com
4. A **GitHub account** with access to this repo

You do **not** need Java, Maven, Node, or MySQL installed on your machine.
Docker Compose builds and runs all of it for you.

## First-time setup
```bash
# 1. Clone the repo
git clone <repo-url>
cd <repo-folder>

# 2. Copy the env template and fill in real values
cp .env.example .env

# 3. Build and start everything (mysql + backend + frontend)
docker compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- MySQL: localhost:3306

Stop everything with `docker compose down` (add `-v` to also wipe the database volume).

## Folder structure
```
.
├── backend/          # Spring Boot project (pom.xml + src/ go here)
├── frontend/          # React project (package.json + src/ go here)
├── .github/workflows/ # CI pipeline (build + test on every push/PR)
├── docker-compose.yml # Runs the whole stack with one command
├── .env.example        # Template for required environment variables
└── .gitignore
```

## Daily Git workflow (everyone follows this)
1. **Pull latest changes**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a branch for your task**
   ```bash
   git checkout -b feature/short-description
   ```
   Naming convention: `feature/...`, `bugfix/...`, `hotfix/...`

3. **Work locally**, test with `docker compose up --build` if backend/frontend code changed.

4. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "Add JWT login endpoint"
   ```

5. **Push your branch**
   ```bash
   git push origin feature/short-description
   ```

6. **Open a Pull Request** on GitHub into `main`. GitHub Actions will automatically
   build and test both frontend and backend. Get at least one review before merging.

7. **After merge**, delete the branch and start the next task from step 1.

## Branch protection (set this up once on GitHub)
Repo → Settings → Branches → Add rule for `main`:
- Require a pull request before merging
- Require status checks (CI) to pass before merging

## Notes for contributors
- Never commit `.env` — only `.env.example` is tracked.
- If `docker compose up` fails after pulling new changes, try `docker compose up --build`
  to force a rebuild (someone likely changed a dependency).
- Ask before resolving merge conflicts in `pom.xml`, `package.json`, or `docker-compose.yml`
  since these affect everyone.
