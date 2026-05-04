# Notes Management App

## Description
A full-stack notes application built using Django and Next.js.

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
├── packages/
├── docs/
├── logs/
└── README.md
```

## How to Run
1. Run backend: `python manage.py runserver`
2. Run frontend: `npm run dev`

## API
- Base URL: `http://127.0.0.1:8000/api`
- Notes endpoint: `/notes/`

## Final Submission Notes
- Add screenshots for the notes list page, create note page, API running, and edit/delete working.
- Keep commit hashes and log entries in your Google Docs progress log.
- Use the `logs/` folder for any local submission notes or pasted report content.
