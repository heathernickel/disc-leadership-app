# Leadership DISC Profile (Stable MVP)

A streamlined, production-minded MVP for a DISC-style leadership assessment.

> **Important:** This is a DISC-style behavioral leadership tool for development and coaching, **not** a clinically validated psychological instrument.

## What this stable version includes

- ✅ Homepage with leadership-focused copy and clear CTAs
- ✅ 32-question assessment (Likert 1–5)
- ✅ Transparent DISC scoring engine (editable)
- ✅ Results dashboard with leadership narrative + chart
- ✅ Optional save-to-database submission flow
- ✅ Client-side PDF export

## Recommended architecture

- **Framework:** Next.js 14 + TypeScript (App Router)
- **UI:** Tailwind CSS with reusable components
- **Validation:** Zod + React Hook Form
- **Data:** Prisma ORM + SQLite for local development
- **Charts:** Recharts
- **PDF:** jsPDF (client-side)

## Route structure

### Public pages
- `/` homepage
- `/assessment` assessment flow
- `/results` results dashboard + optional save
- `/sample-report` sample report preview

### API routes
- `POST /api/assessment/score` calculate DISC result
- `POST /api/assessment/save` persist optional submission

## DISC content/scoring model (editable)

All editable logic/content is under:

```
src/lib/disc/
  questions.ts
  scoring.ts
  narratives.ts
  blends.ts
```

Scoring behavior:
1. Answer options map to weighted D/I/S/C contributions.
2. Raw totals are normalized to percentages (0–100).
3. Primary and secondary styles are selected from ranked normalized scores.
4. Tie-break order is deterministic (`D > I > S > C`).

## Data model

Defined in `prisma/schema.prisma`:
- `AssessmentSubmission`
- `AssessmentAnswer`

Each submission stores profile info (optional), answer payload, scores, styles, blend label, and generated narrative snapshot.

## Local setup

```bash
npm install
cp .env.example .env
npm run prisma:generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

## Environment variables

See `.env.example`:
- `DATABASE_URL` (SQLite local path by default)
- `NEXT_PUBLIC_APP_URL`
- `ADMIN_SESSION_SECRET` (kept for future expansion)

## Deployment notes (Vercel)

- Use a managed PostgreSQL database in production.
- Update `datasource db.provider` in `prisma/schema.prisma` to `"postgresql"`.
- Set `DATABASE_URL` to your production Postgres URL.
- Run Prisma migrations in your deployment pipeline.

## Seed data

`prisma/seed.ts` creates several realistic sample assessment submissions for quick dashboard/flow testing.
