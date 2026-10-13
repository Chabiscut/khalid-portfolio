This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Portfolio administration

Open [http://localhost:3000/admin](http://localhost:3000/admin) and sign in with
the GitHub account whose email matches `AUTH_ADMIN_EMAIL` in `.env`. Configure
the GitHub OAuth callback URL as `http://localhost:3000/api/auth/callback/github`
for local development. From any page, press **Alt+Shift+A** to open the admin
login page. The shortcut does not bypass sign-in; only the authorized GitHub
account can access admin pages.

From the admin dashboard you can manage projects, skills, technologies,
experience, education, certificates, blog content, and site settings. Use
**Site Settings** to update your contact details and social profile links. To
add a resume later, upload a PDF there; the public resume download button
activates once an upload completes. Resume uploads require the Cloudinary
environment variables in `.env`.

Add your own projects from **Projects → Add Project**. `npm run seed` only
removes the starter demo projects and updates default profile settings and
technologies; it preserves other portfolio content.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Set `DATABASE_URL` in the Vercel environment used by the deployment. The build
runs `prisma migrate deploy` before Next.js, so the database schema is applied
before pages query it. For a new, empty database, deploying the project applies
the checked-in migrations automatically.

If you already created the production schema with `prisma db push`, do not
deploy the initial migration until you have confirmed that the existing schema
matches it. Baseline that database once using
`npx prisma migrate resolve --applied 20261013000000_init` with
`DATABASE_URL` pointing to that database, then redeploy. If the schema is
partial or differs from the migration, back it up and reconcile it before
deploying; do not baseline a mismatched schema.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
