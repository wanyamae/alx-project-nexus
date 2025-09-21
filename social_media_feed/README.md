
# Social Media Feed

A modern Next.js app with local authentication using React Context API and user roles, featuring a responsive header, protected routes, and a custom login flow.

---

## Features
- Local authentication using a JSON file for users
- User roles (admin, user, etc.) with role-based access to navigation and components
- React Context API for global auth state
- Responsive header with mobile dropdown menu
- Protected routes and conditional rendering
- Fancy login page and loading screen after login

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd social_media_feed
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Project Structure
```
src/
	app/
		layout/
			Header.tsx
			Footer.tsx
		login/
			page.tsx         # Login form
			loading.tsx      # Loading screen after login
		...
	context/
		AuthContext.tsx    # Auth provider and hook
	data/
		users.json         # User credentials and roles
```

### 4. Local Authentication Setup
- `src/data/users.json` contains user objects:
	```json
	[
		{ "username": "admin", "password": "adminpass", "role": "admin" },
		{ "username": "user1", "password": "user1pass", "role": "user" }
	]
	```
- `src/context/AuthContext.tsx` provides:
	- `user`, `isAuthenticated`, `login`, `logout` via React Context
	- Stores user in localStorage for persistence

### 5. Login Flow
- `src/app/login/page.tsx` is a modern login form using the context's `login()`
- On successful login, redirects to `/login/loading` (see below)
- `src/app/login/loading.tsx` shows a loading spinner, then redirects to `/`

### 6. Header & Navigation
- `src/app/layout/Header.tsx`:
	- Shows nav links and user info if authenticated
	- Shows only login button if not authenticated
	- Responsive: hamburger menu for mobile
	- Dropdown menu for mobile navigation
	- Conditionally renders links/components based on `user.role`

### 7. Protecting Components/Routes
- Use `user?.role` from context to restrict access to components/pages
- Example:
	```tsx
	const { user } = useAuth();
	if (user?.role !== "admin") return <div>Access Denied</div>;
	```

### 8. Customization
- Update `users.json` to add/remove users and roles
- Style login, header, and loading pages as desired (Tailwind CSS used)

---

## Example Scripts & Commands

### Install Next.js and Tailwind CSS
```bash
npx create-next-app@latest social_media_feed --typescript
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Install Additional Packages
```bash
npm install
```

---

## Authentication with Context API
- No external authentication libraries used (no OAuth, no next-auth)
- All authentication logic is in `AuthContext.tsx` and uses local JSON data

---

## License
MIT
