# DecisionHub — Database Module (`/database`)

This folder contains all database schemas, seed datasets, ER diagrams, and object-relational mapping documentation for **DecisionHub**.

---

## 📁 Directory Structure

```
database/
├── BACKEND_MAPPING_GUIDE.md   # Comprehensive mapping guide between DB tables and Spring Boot JPA Entities
├── README.md                  # This documentation file
├── er-diagram.txt             # Visual ASCII ER diagram & relational integrity specs
├── schema.sql                 # Primary PostgreSQL/MySQL DDL table definitions
└── seed/
    └── sample_data.sql        # Realistic seed data (categories, users, decisions, options, polls, votes)
```

---

## 🗄️ Database Schema Overview

The database is structured around 16 interconnected relational tables:

1. **Identity & Access Management**:
   - `users`: Core authentication table (BCrypt password hashes, roles: `USER`, `MODERATOR`, `ADMIN`).
   - `user_profiles`: Extended user metadata (bio, avatar, preferences).
   - `user_interests`: Junction table connecting users to topic categories.

2. **Categorization & Communities**:
   - `categories`: Topic taxonomy (Career, Education, Technology, Travel, Finance, Lifestyle).
   - `communities`: Interest-based user hubs created by community leaders.
   - `community_members`: Role-based community memberships.

3. **Decision & Poll Architecture**:
   - `decisions`: Core decision entity created by users (`PUBLIC` / `PRIVATE`).
   - `decision_options`: Multi-choice alternatives evaluated in a decision.
   - `comparison_factors`: Evaluation criteria (Cost, Risk, Time, Quality).
   - `option_scores`: Weighted 1-10 scoring per option per factor.
   - `polls`: Voting sessions associated with decisions (`SINGLE`, `MULTI`, `RATING`).
   - `poll_options`: Links between polls and decision options.
   - `votes`: Enforces 1 vote per user per decision (`UNIQUE(poll_id, voter_id)`).

4. **Engagement & Moderation**:
   - `comments`: Threaded discussions with hierarchical `parent_id` self-references.
   - `notifications`: User alert feed for votes, replies, and status updates.
   - `moderation_flags`: Content moderation queue for reported decisions/comments.

---

## 🚀 How to Run & Initialize Database

### Using Docker Compose
The database automatically spins up via `mysql:8.0` in the root `docker-compose.yml`:

```bash
docker compose up -d mysql
```

### Direct MySQL Connection
* **Host**: `localhost` (or `mysql` within Docker network)
* **Port**: `3306`
* **Database**: `decisionhub_db`
* **User**: `decisionuser`
* **Password**: `decisionpass` (or root credentials from `.env`)

### Manual Schema Initialization
```bash
mysql -u decisionuser -p decisionhub_db < schema.sql
mysql -u decisionuser -p decisionhub_db < seed/sample_data.sql
```
