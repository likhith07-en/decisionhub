# DecisionHub — Database to Backend Mapping Guide

> **For Backend Developers**: Use this document to map Spring Boot JPA `@Entity` classes to the database tables.

---

## Table → Entity Mapping

| # | DB Table | Java Entity Class | Notes |
|---|---|---|---|
| 1 | `users` | `User.java` | `email` is UNIQUE, `role` = USER / MODERATOR / ADMIN |
| 2 | `user_profiles` | `UserProfile.java` | `@OneToOne` with `User` via `user_id` (UNIQUE) |
| 3 | `categories` | `Category.java` | Lookup table, used by decisions, communities, user_interests |
| 4 | `user_interests` | — | Junction table: `@ManyToMany` between `User` ↔ `Category` |
| 5 | `communities` | `Community.java` | `created_by` → FK to `users.id` |
| 6 | `community_members` | `CommunityMember.java` | `UNIQUE(community_id, user_id)`, has `role` column |
| 7 | `decisions` | `Decision.java` | `owner_id` → FK to `users.id`, `is_deleted` for soft delete |
| 8 | `decision_options` | `DecisionOption.java` | `label` = option name (e.g. "MBA", "Job") |
| 9 | `comparison_factors` | `ComparisonFactor.java` | User-defined criteria per decision (Cost, Risk, Time, etc.) |
| 10 | `option_scores` | `OptionScore.java` | Score 1-10 per option per factor |
| 11 | `polls` | `Poll.java` | `poll_type` = SINGLE / MULTI / RATING |
| 12 | `poll_options` | `PollOption.java` | Links `polls` ↔ `decision_options` |
| 13 | `votes` | `Vote.java` | `UNIQUE(poll_id, voter_id)` prevents duplicates |
| 14 | `comments` | `Comment.java` | `parent_id` → self-referencing FK for threaded replies |
| 15 | `notifications` | `Notification.java` | `type` = NEW_COMMENT / NEW_VOTE / etc. |
| 16 | `moderation_flags` | `ModerationFlag.java` | `target_type` = COMMENT / DECISION |

---

## Column Mappings Per Entity

### 1. User.java ← `users`
```
id              → Long id              @Id @GeneratedValue
email           → String email         @Column(unique = true, nullable = false)
password_hash   → String passwordHash  (BCrypt encoded)
full_name       → String fullName
role            → String role          ("USER" / "MODERATOR" / "ADMIN")
provider        → String provider      ("LOCAL" / "GOOGLE")
created_at      → LocalDateTime createdAt
is_active       → Boolean isActive
```

### 2. UserProfile.java ← `user_profiles`
```
id              → Long id              @Id @GeneratedValue
user_id         → User user            @OneToOne @JoinColumn(name = "user_id")
bio             → String bio
avatar_url      → String avatarUrl
```

### 3. Decision.java ← `decisions`
```
id              → Long id              @Id @GeneratedValue
owner_id        → User owner           @ManyToOne @JoinColumn(name = "owner_id")
title           → String title         @Column(nullable = false)
description     → String description
visibility      → String visibility    ("PUBLIC" / "PRIVATE")
category_id     → Category category    @ManyToOne @JoinColumn(name = "category_id")
created_at      → LocalDateTime createdAt
is_deleted      → Boolean isDeleted    (soft delete flag)
```

### 4. DecisionOption.java ← `decision_options`
```
id              → Long id              @Id @GeneratedValue
decision_id     → Decision decision    @ManyToOne @JoinColumn(name = "decision_id")
label           → String label         (e.g. "MBA", "Job", "iPhone 15 Pro")
description     → String description
```

### 5. ComparisonFactor.java ← `comparison_factors`
```
id              → Long id              @Id @GeneratedValue
decision_id     → Decision decision    @ManyToOne @JoinColumn(name = "decision_id")
name            → String name          (e.g. "Cost", "Risk", "Time")
```

### 6. OptionScore.java ← `option_scores`
```
id              → Long id              @Id @GeneratedValue
option_id       → DecisionOption option @ManyToOne @JoinColumn(name = "option_id")
factor_id       → ComparisonFactor factor @ManyToOne @JoinColumn(name = "factor_id")
score           → Integer score        (1 to 10)
```

### 7. Poll.java ← `polls`
```
id              → Long id              @Id @GeneratedValue
decision_id     → Decision decision    @ManyToOne @JoinColumn(name = "decision_id")
poll_type       → String pollType      ("SINGLE" / "MULTI" / "RATING")
is_anonymous    → Boolean isAnonymous
ends_at         → LocalDateTime endsAt
```

### 8. PollOption.java ← `poll_options`
```
id              → Long id              @Id @GeneratedValue
poll_id         → Poll poll            @ManyToOne @JoinColumn(name = "poll_id")
option_id       → DecisionOption option @ManyToOne @JoinColumn(name = "option_id")
```

### 9. Vote.java ← `votes`
```
id              → Long id              @Id @GeneratedValue
poll_id         → Poll poll            @ManyToOne @JoinColumn(name = "poll_id")
poll_option_id  → PollOption pollOption @ManyToOne @JoinColumn(name = "poll_option_id")
voter_id        → User voter           @ManyToOne @JoinColumn(name = "voter_id") (nullable if anonymous)
rating          → Integer rating       (only for RATING polls, 1-5)
voted_at        → LocalDateTime votedAt

Constraint: @Table(uniqueConstraints = @UniqueConstraint(columnNames = {"poll_id", "voter_id"}))
```

### 10. Comment.java ← `comments`
```
id              → Long id              @Id @GeneratedValue
decision_id     → Decision decision    @ManyToOne @JoinColumn(name = "decision_id")
author_id       → User author          @ManyToOne @JoinColumn(name = "author_id")
parent_id       → Comment parent       @ManyToOne @JoinColumn(name = "parent_id") (self-referencing, nullable)
content         → String content       @Column(length = 2000)
created_at      → LocalDateTime createdAt
is_flagged      → Boolean isFlagged
```

### 11. Community.java ← `communities`
```
id              → Long id              @Id @GeneratedValue
name            → String name          @Column(unique = true)
category_id     → Category category    @ManyToOne @JoinColumn(name = "category_id")
description     → String description
created_by      → User createdBy       @ManyToOne @JoinColumn(name = "created_by")
```

### 12. CommunityMember.java ← `community_members`
```
id              → Long id              @Id @GeneratedValue
community_id    → Community community  @ManyToOne @JoinColumn(name = "community_id")
user_id         → User user            @ManyToOne @JoinColumn(name = "user_id")
role            → String role          ("MEMBER" / "MODERATOR")

Constraint: @Table(uniqueConstraints = @UniqueConstraint(columnNames = {"community_id", "user_id"}))
```

### 13. Notification.java ← `notifications`
```
id              → Long id              @Id @GeneratedValue
user_id         → User user            @ManyToOne @JoinColumn(name = "user_id")
type            → String type          ("NEW_COMMENT" / "NEW_VOTE" / etc.)
message         → String message
is_read         → Boolean isRead
created_at      → LocalDateTime createdAt
```

### 14. ModerationFlag.java ← `moderation_flags`
```
id              → Long id              @Id @GeneratedValue
target_type     → String targetType    ("COMMENT" / "DECISION")
target_id       → Long targetId
reported_by     → User reportedBy      @ManyToOne @JoinColumn(name = "reported_by")
reason          → String reason
status          → String status        ("PENDING" / "RESOLVED")
```

---

## Relationship Summary for JPA

```
User        @OneToOne   → UserProfile
User        @ManyToMany → Category       (via user_interests junction table)
User        @OneToMany  → Decision, Vote, Comment, Notification, ModerationFlag

Decision    @ManyToOne  → User (owner), Category
Decision    @OneToMany  → DecisionOption, ComparisonFactor, Poll, Comment

DecisionOption @ManyToOne → Decision
DecisionOption @OneToMany → OptionScore, PollOption

Poll        @ManyToOne  → Decision
Poll        @OneToMany  → PollOption, Vote

Vote        @ManyToOne  → Poll, PollOption, User
            UNIQUE(poll_id, voter_id) — prevents duplicate votes

Comment     @ManyToOne  → Decision, User, Comment(parent) — self-referencing

Community   @ManyToMany → User (via community_members)
```

---

## Transaction Requirements

1. **Create Decision + Options**: Wrap in `@Transactional` so if option creation fails, the decision is rolled back.
2. **Cast Vote**: Wrap in `@Transactional` with `UNIQUE(poll_id, voter_id)` constraint check to prevent race-condition duplicate votes.

---

## Connection Details (Docker)

| Setting | Value |
|---|---|
| Host | `localhost` |
| Port | `3306` |
| Database | `myapp_db` |
| Username | `root` / `myapp_user` |
| Password | `rootpass` / `myapp_pass` |
| JDBC URL | `jdbc:mysql://mysql:3306/myapp_db` (inside Docker) |
