# Sunaura

A modern summer e-commerce web application built with Next.js 16, featuring product browsing, user authentication, and profile management.

## Live URL

[https://sunaura.vercel.app](https://sunaura.vercel.app)

## Purpose

Sunaura is a summer shopping destination where users can browse seasonal products like sunglasses, beach hats, sunscreen, clothing, and accessories. The app demonstrates a full-stack Next.js application with authentication, protected routes, and a clean responsive UI.

## Key Features

- **Home Page** — Hero banner slider, top-rated popular products, summer care tips, and featured brands
- **Product Listing** — Responsive grid of all products with ratings and pricing
- **Product Details (Protected)** — Detailed product view with stock, category, and brand info — accessible only to logged-in users
- **Authentication** — Email/password sign up and sign in powered by Better Auth, with Google OAuth support
- **Protected Routes** — Middleware (proxy.js) guards `/profile` and `/products/:id` routes, redirecting unauthenticated users to sign in
- **User Profile** — Displays logged-in user's name, email, verification status, and join date
- **Update Profile** — Form to update display name and profile photo URL
- **Animations** — Page entrance animations using Animate.css
- **Responsive Design** — Mobile-first layout across all pages
- **Footer** — Contact info, social links, quick links, and legal pages

## NPM Packages Used

| Package | Purpose |
|---|---|
| `next` 16.2.4 | React framework with App Router, SSR, and API routes |
| `react` 19.2.4 | UI library |
| `better-auth` | Authentication — email/password and Google OAuth |
| `@better-auth/mongo-adapter` | MongoDB adapter for Better Auth |
| `mongodb` | MongoDB client for database connection |
| `animate.css` | CSS animation library for entrance animations |
| `react-icons` | Icon library (Material Design, Font Awesome, Google icons) |
| `tailwindcss` v4 | Utility-first CSS framework |
| `daisyui` v5 | Tailwind CSS component library |

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   BETTER_AUTH_SECRET=your_secret_here
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
