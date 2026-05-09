# Notes Management App

## Description
A full-stack notes application built using Django and Next.js. This repository is organized as a monorepo and is configured to use Turborepo for task orchestration and caching.

## Features
- Create notes
- View notes
- Edit notes
- Delete notes

## Tech Stack
- Frontend: Next.js, Tailwind CSS
- Backend: Django, Django REST Framework
- Database: SQLite

## Project Structure
```text
notes-app-monorepo/
├── apps/
│   ├── api/     # Django backend
│   └── web/     # Next.js frontend
├── packages/    # shared packages (config, ui, utils)
├── docs/
├── logs/
└── README.md
```

## Monorepo (Turborepo)
This repository is configured to use Turborepo to run tasks across workspaces, cache build outputs, and run tasks in parallel where possible. Key files:

- `package.json` (root) - workspace configuration and `turbo` scripts
- `turbo.json` - Turborepo pipeline configuration
- `.turboignore` - files/directories excluded from cache

## Quick Start

1. Install dependencies at the repository root (uses Yarn Berry / Plug'n'Play by default):

```bash
yarn install
```

2. Development (runs turborepo dev pipeline):

```bash
yarn dev
```

3. Build all packages/apps with caching:

```bash
yarn build
```

4. Lint or test across workspaces:

```bash
yarn lint
yarn test
```

5. Run services individually when needed:

```bash
# Django API
cd apps/api
python manage.py runserver

# Next.js frontend (if running directly inside web)
cd apps/web
yarn dev
```

## API
- Base URL: `http://127.0.0.1:8000/api`
- Notes endpoint: `/notes/`

## Notes & Next Steps
- Shared packages live in `packages/` and can be imported by the `web` app.
- Add environment variables in `.env` files as needed (they are ignored by Turborepo cache).
- For CI, use `turbo run build --force` to ensure fresh builds when required.

## Contribution & Development Tips
- Use `turbo run <task> --filter=<pkg-or-app>` to target specific packages.
- To clear Turborepo cache:

```bash
yarn clean
```

## Final Submission Notes
- Add screenshots for the notes list page, create note page, API running, and edit/delete working.
- Keep commit hashes and log entries in your progress log.
- Use the `logs/` folder for any local submission notes or pasted report content.
