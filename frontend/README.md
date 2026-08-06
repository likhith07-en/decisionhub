# DecisionHub — Frontend Web Application (`/frontend`)

The frontend of **DecisionHub** is a single-page application built with **React 18**, **Vite 5**, **Tailwind CSS**, **Framer Motion**, and a modern Glassmorphism theme system.

---

## 📁 Directory Structure

```
frontend/
├── Dockerfile                  # Multi-stage Node builder + Nginx production container
├── index.html                  # HTML5 entry point & typography link
├── nginx.conf                  # Nginx proxy & SPA client routing config
├── package.json                # NPM packages & build scripts
├── postcss.config.js           # PostCSS Tailwind preprocessor
├── tailwind.config.js          # Custom theme tokens, colors, glass borders & utilities
├── vite.config.js              # Vite server & proxy configuration
└── src/
    ├── main.jsx                # React DOM root renderer
    ├── App.jsx                 # Top-level routing & layout coordinator
    ├── index.css               # Global theme tokens, variables, & utility classes
    ├── api/
    │   └── axiosClient.js      # Central Axios client with Bearer auth & storage merging
    ├── components/             # Reusable UI component library
    │   ├── AuthPageShell.jsx   # Shared layout for auth pages
    │   ├── BrandMark.jsx       # DecisionHub vector logo & branding
    │   ├── DecisionCard.jsx    # Interactive card for decisions in feeds
    │   ├── Footer.jsx          # Pinned sticky footer with navigation links
    │   ├── IconSidebar.jsx     # Right-edge quick utility & theme control rail
    │   ├── Loader.jsx          # Animated spinner & skeleton loading states
    │   ├── Navbar.jsx          # Top navigation bar with active route highlighting
    │   ├── PageTransition.jsx  # Framer Motion smooth page transitions
    │   ├── PollCard.jsx        # Option voting card with progress bars
    │   ├── ProtectedRoute.jsx  # Auth guard component redirecting unauthenticated users
    │   ├── ResultChart.jsx     # Vote distribution bar chart component
    │   ├── Sidebar.jsx         # Left navigation drawer
    │   └── VoteButton.jsx      # Animated interactive vote button
    ├── context/
    │   └── AuthContext.jsx     # React Context for authentication state & user sessions
    ├── layouts/
    │   └── MainLayout.jsx      # Page layout shell wrapping Navbar, Sidebar, and Content
    ├── pages/                  # Route view components
    │   ├── AnalysisPage.jsx    # /analysis — Voted decisions, win/loss stats & vote charts
    │   ├── AnalyticsPage.jsx   # /analytics — Creator reach, views, votes & conversion
    │   ├── ContactSupport.jsx  # /contact-support — Support tickets & contact channels
    │   ├── CreateDecision.jsx  # /decisions/create — Poll builder with dynamic options
    │   ├── DashboardPage.jsx   # /dashboard — Main feed & quick-action cards
    │   ├── DecisionDetails.jsx # /decisions/:id — Decision info, comments, attached poll
    │   ├── ForgotPasswordPage.jsx # /forgot-password — Password recovery workflow
    │   ├── LoginPage.jsx       # /login — Account login
    │   ├── NotFound.jsx        # /404 — Not found fallback
    │   ├── PrivacyPolicy.jsx   # /privacy-policy — Privacy terms & data handling
    │   ├── Profile.jsx         # /profile — User account overview & role badges
    │   ├── SignupPage.jsx      # /signup — User registration
    │   ├── TermsConditions.jsx # /terms-conditions — Terms of service
    │   └── VotePage.jsx        # /decisions/:id/vote — Interactive poll ballot
    ├── services/
    │   └── decisionStorage.js  # Local storage sync engine for analytics, reach & votes
    └── theme/
        └── useTheme.js         # Theme switching hook (Default, Light, Dark, Accent modes)
```

---

## 🚀 Application Routes

| Path | Page Name | Access | Description |
|---|---|---|---|
| `/login` | `LoginPage` | Public | Account authentication |
| `/signup` | `SignupPage` | Public | New user registration |
| `/forgot-password` | `ForgotPasswordPage` | Public | Password reset request |
| `/dashboard` | `DashboardPage` | Protected | Community decision stream & summary |
| `/analysis` | `AnalysisPage` | Protected | User's voted decisions, win/loss indicators & charts |
| `/analytics` | `AnalyticsPage` | Protected | Creator impressions, reach, views, and conversion rates |
| `/decisions/create`| `CreateDecision` | Protected | Decision poll creator with options |
| `/decisions/:id` | `DecisionDetails` | Protected | Full decision details, attached poll & discussion |
| `/decisions/:id/vote` | `VotePage` | Protected | Cast vote ballot on decision options |
| `/profile` | `Profile` | Protected | User profile details & membership information |
| `/privacy-policy` | `PrivacyPolicy` | Protected | Privacy policy & data protection terms |
| `/terms-conditions`| `TermsConditions`| Protected | Platform terms & conditions |
| `/contact-support`| `ContactSupport` | Protected | Customer support & inquiry submission |

---

## 🛠️ Development & Build

### Run Locally
```bash
npm install
npm run dev
```
Dev server starts at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Generates production bundle in `dist/`.
