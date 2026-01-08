## LaunchFast

AI-powered landing page & waitlist generator for founders who want to validate ideas quickly without hiring designers or copywriters.

### Tech stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Row Level Security)
- **AI**: OpenAI API (server-side only)
- **Payments**: Stripe Checkout
- **Hosting**: Vercel, custom domain-ready for `dreamlio.xyz`

### Getting started

1. Clone this repository.
2. Copy `.env.example` to `.env.local` and fill in all required values.
3. Install dependencies with `npm install`.
4. Run the development server with `npm run dev`.

### Environment variables

The app expects the following variables (use `.env.local` in development):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL` (e.g. `https://dreamlio.xyz`)

### Deployment

- Connect the repository to Vercel.
- Set all environment variables in the Vercel dashboard.
- Point the `dreamlio.xyz` domain at the Vercel project.
