# Job Tracker

A full-stack job application tracking app built with Next.js, Prisma, and PostgreSQL.
Organize your entire job search in one place — from first application to offer.

🔗 **[Live Demo](https://job-app-tracking.vercel.app/)**

![Job Tracker Dashboard](/screenshot.jpg)

---

## Features

- 📋 **Kanban-style dashboard** — track applications across four stages: Applied, Interviewing, Offer, and Rejected
- 🔐 **Multi-provider authentication** — sign in with Google, GitHub, or try instantly with a Demo account (no registration needed)
- 📝 **Detailed job pages** — store company, position, location, salary, tags, notes, description, and a direct link to the job listing
- ✏️ **Full CRUD** — add, view, and edit every application
- 🎨 **Status-based color theming** — dynamic visual indicators per application stage
- 🔒 **Route-level auth guards** — all dashboard routes are protected server-side with automatic redirects
- 👤 **User-scoped data** — each user only sees their own job applications
- 📱 **Fully responsive** — mobile-first layout that works across all screen sizes

---

## Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Framework  | Next.js 15 (App Router) |
| Language   | TypeScript              |
| Styling    | Tailwind CSS            |
| Database   | PostgreSQL              |
| ORM        | Prisma                  |
| Auth       | Auth.js v5 (NextAuth)   |
| Deployment | Vercel                  |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (e.g. [Neon](https://neon.tech) or local instance)

### Installation

```bash
git clone https://github.com/p-glazowski/job-tracker.git
cd job-tracker
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL="postgresql://..."

AUTH_SECRET="your-auth-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

> You can generate `AUTH_SECRET` by running `npx auth secret`.

### Database Setup

Run Prisma migrations to set up your schema:

```bash
npx prisma migrate dev
npx prisma generate
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
app/
├── page.tsx                  # Landing page
├── layout.tsx                # Root layout with NavBar & SessionProvider
├── login/
│   └── page.tsx              # Login page (Google, GitHub, Demo)
├── dashboard/
│   ├── page.tsx              # Kanban board (4 status columns)
│   ├── [id]/
│   │   ├── page.tsx          # Job detail page
│   │   └── edit/
│   │       └── page.tsx      # Edit job application
├── new/
│   └── page.tsx              # Add new application form
auth.ts                       # Auth.js config (providers, JWT, PrismaAdapter)
components/
├── homePage/                 # Landing page sections (Hero, Perks, Screenshots)
├── StatusSection/            # Kanban column components
├── SingleJob/                # Job detail UI (StackBubble, etc.)
├── form/                     # Reusable inputs (SingleInput, TextArea, SubmitButton)
├── Login/                    # LoginButton, DemoLogin
├── NavBar.tsx
└── Footer.tsx
prisma/
└── schema.prisma             # Database models (User, Job, Account, Session)
```

---

## Database Schema

The app uses 4 Prisma models:

- **User** — stores account info, linked to jobs and OAuth accounts
- **Job** — stores all job application data scoped to a user
- **Account** — OAuth provider accounts (NextAuth managed)
- **Session** — JWT sessions (NextAuth managed)

---

## Authentication

Authentication is handled by **Auth.js v5** with three providers:

- **Google OAuth**
- **GitHub OAuth**
- **Demo / Credentials** — creates or upserts a temporary demo user so anyone can explore the app without signing up

Sessions use a **JWT strategy** with the user ID stored in the token and exposed via session callbacks.

---

## Roadmap

- [ ] Application timeline / activity log
- [ ] Drag and drop between status columns
- [ ] Email reminders for follow-ups
- [ ] Analytics dashboard
- [ ] Filter and search applications

---

## License

MIT
