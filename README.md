# Notes Management App - Monorepo

This project is part of my Final Year Project (FYP) and follows a component-based monorepo architecture. It is aligned with The Clean Streak course process requirements.

## Tech Stack

- Frontend: Next.js + Tailwind CSS
- Backend: Django + Django REST Framework
- Version Control: GitHub
- Design Tool: Figma
- Documentation: Google Docs

## Monorepo Structure

```text
notes-app-monorepo/
|- apps/
|  |- web/                 # Next.js frontend
|  \- api/                 # Django backend
|- packages/
|  |- ui/                  # Reusable UI components
|  |- utils/               # Shared utility functions
|  \- config/              # Shared configurations
|- docs/                   # Architecture and design documentation
|- logs/                   # Clean Streak assessment logs
\- README.md
```

## Core Features

- Create notes
- Edit notes
- Delete notes
- Search notes
- Categorize notes
- Store and retrieve notes via REST API

## Design Patterns

- MVC (Model-View-Controller)
- Component-Based Architecture
- Singleton Pattern (Configuration)
- Factory Pattern (Component Creation)

## GitHub Copilot Project Prompt

Copy and paste this into GitHub Copilot Chat in VS Code:

```text
You are assisting me in building a Final Year Project using a monorepo architecture.
This project follows a component-based development approach and is part of a course
called "The Clean Streak," which requires structured documentation and design pattern implementation.

Project Title: Notes Management App

Objective:
To build a scalable and reusable repository of components that will be used in my Final Year Project (FYP).

Architecture:
- Monorepo Structure
- Frontend: Next.js (React + Tailwind CSS)
- Backend: Django with Django REST Framework
- Version Control: GitHub
- Documentation: Google Docs
- Design Tool: Figma

Monorepo Folder Structure:
notes-app-monorepo/
├── apps/
│   ├── web/                 # Next.js frontend
│   └── api/                 # Django backend
├── packages/
│   ├── ui/                  # Reusable UI components
│   ├── utils/               # Shared utility functions
│   └── config/              # Shared configurations
├── docs/                    # Architecture and design documentation
├── logs/                    # Clean Streak assessment logs
└── README.md

Core Features:
1. Create notes
2. Edit notes
3. Delete notes
4. Search notes
5. Categorize notes
6. Store and retrieve notes via REST API

Backend Requirements (Django):
- Use Django REST Framework
- Create a Note model with fields:
  - id
  - title
  - content
  - category
  - created_at
  - updated_at
- Implement CRUD operations using ModelViewSet
- Enable CORS for frontend integration

Frontend Requirements (Next.js):
- Use Tailwind CSS for styling
- Implement reusable components:
  - Navbar
  - NoteForm
  - NoteList
  - NoteItem
  - SearchBar
  - CategoryFilter
- Use Axios or Fetch API for communication with the Django backend

Design Patterns to Implement:
- MVC (Model-View-Controller)
- Component-Based Architecture
- Singleton Pattern (Configuration)
- Factory Pattern (Component Creation)

Clean Streak Assessment Requirements:
1. Progress Log:
   - Record every Git commit hash with a description.
2. Ideation Log:
   - Break down the system into components respecting cognitive load.
3. Component Model Practice Log:
   - Document architectural units, object models, and design patterns.

Coding Standards:
- Follow clean code principles.
- Use meaningful variable and function names.
- Include comments and docstrings.
- Apply modular and reusable design.
- Ensure error handling and validation.

Your Tasks:
- Generate boilerplate code for Django and Next.js.
- Suggest best practices and folder structures.
- Assist with debugging and refactoring.
- Provide clear and concise explanations.
- Help implement and document design patterns.

Always produce well-structured, production-ready code.

Connection to Final Year Project:
- This course is to go together with your Final Year Project.
- You are to build the repository of components you can use for your FYP.

"The Clean Streak" Assessment Rhythm:
- 3 Google Doc logs per week (Mon-Wed-Fri OR Tue-Thu-Sat).
- Progress Tab: Log every Git commit hash, with description of component built or integration practiced, including miscellaneous practice code (design patterns, components).
- Ideation Tab: Break down your system into components that respect cognitive load.
- Figma Designs and Interconnection: Docs, Gemini, Stitch with G, Figma interconnection.
- Component Model Practice Tab: Deep dive into an architectural unit, an object model, or X-MAN.

Maintaining this rhythm for 4 weeks = full marks for process.

What counts:
- System trials with component breakdown ideation.
- Independent design pattern implementations.
- Component model test simulations.
- Miscellaneous refactoring / clean code improvements.
```

## How to Use GitHub Copilot in VS Code

1. Open VS Code.
2. Install GitHub Copilot and GitHub Copilot Chat extensions.
3. Sign in with your GitHub account.
4. Open this project folder.
5. Open Copilot Chat with Ctrl + I (or Cmd + I on Mac).
6. Paste the prompt above and press Enter.

## Starter Copilot Requests

- Generate the Django Note model.
- Create a Next.js NoteList component.
- Set up Django REST Framework for CRUD operations.
- Create Tailwind styling for the Notes UI.

## Immediate Next Step

After pasting the prompt into Copilot Chat, continue by generating the Django backend step by step.
