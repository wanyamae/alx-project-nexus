
# Job Board App

This project is a modern, full-stack job board built with Next.js, TypeScript, and SQLite (with cloud-ready migration to Turso or other serverless SQL). It demonstrates best practices in web development, security, and deployment.

---

## 🚀 Implementation Steps

### 1. Project Setup
- Bootstrapped with `create-next-app` using the App Router.
- TypeScript enabled for type safety and maintainability.
- ESLint and Prettier configured for code quality.

### 2. Environment Variables
- Sensitive keys (API keys, DB credentials) are stored in `.env.local` and never hardcoded.
- All secrets are accessed via `process.env` for security and portability.

### 3. Database Layer
- Uses SQLite locally for rapid prototyping and development.
- Parameterized SQL queries prevent SQL injection.
- Passwords are hashed with `bcryptjs` before storage.
- Database connections are always closed after use.
- **Cloud-ready:** Easily migrates to Turso (serverless SQLite) or other cloud SQL providers for production.

### 4. API Routes
- All backend logic is implemented in `src/app/api/` using Next.js API routes.
- Handlers return `Response` or `Promise<Response>` for compatibility with serverless platforms.
- Error handling is robust, with meaningful messages and HTTP status codes.

### 5. Authentication & Security
- User registration and login use hashed passwords and secure cookies.
- Auth state is managed globally with React context.
- Only authenticated users can access protected routes.

### 6. State Management & Context
- Global state (auth, jobs, notifications) is managed with React context and hooks.
- Toast notifications provide user feedback for all actions.

### 7. UI/UX & Accessibility
- Modern, responsive UI built with React and Tailwind CSS.
- Accessible modals, forms, and navigation (ARIA attributes, keyboard support).
- All user feedback is handled with non-blocking toast notifications.

### 8. Error Handling
- All API and UI errors are caught and displayed to the user in a friendly way.
- Loading and empty states are handled gracefully.

### 9. Deployment
- Designed for seamless deployment on Vercel.
- All environment variables are set in the Vercel dashboard for production.
- Cloud database (Turso or similar) is recommended for production deployments.

---

## 🏆 Best Practices Demonstrated

- **TypeScript everywhere:** Strong typing for all data models and API handlers.
- **Separation of concerns:** Context, UI, and data logic are modular and maintainable.
- **Security:** Password hashing, parameterized queries, and environment variable management.
- **Accessibility:** ARIA attributes, keyboard navigation, and accessible forms/modals.
- **Cloud-ready:** Easily migrates from local SQLite to serverless SQL (Turso, Supabase, etc.).
- **Modern React:** Uses hooks, context, and the App Router for scalable architecture.
- **Error handling:** User-friendly error messages and robust backend error reporting.

---

## 🛠️ Running Locally

1. Clone the repo and install dependencies:
	```bash
	npm install
	```
2. Set up your `.env.local` file with the required secrets (see `.env.example`).
3. Start the dev server:
	```bash
	npm run dev
	```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

1. The project is deployed to vercel at: https://alx-project-nexus-i3gdm47bn-emmanuel-wanyamas-projects.vercel.app/profile
use the following details to log in: Username: user; Password: !qaz
---

---

_This project is a showcase of modern web development best practices, designed for learning, extensibility, and real-world deployment._

I will reuse the components in other hobby projects
