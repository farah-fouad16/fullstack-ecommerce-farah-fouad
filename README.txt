========================================================================
PROJECT SUBMISSION: FULLSTACK E-COMMERCE APPLICATION
========================================================================

Student Username: farah-fouad16
Repository Name:  fullstack-ecommerce-farah-fouad
Repository URL:   https://github.com/farah-fouad16/fullstack-ecommerce-farah-fouad

------------------------------------------------------------------------
1. PROJECT OVERVIEW
------------------------------------------------------------------------
This is a production-ready, fullstack e-commerce platform built with a 
modern JavaScript stack, featuring complete user authentication, 
product listing, shopping cart management, and admin dashboard workflows.

Repository Link:
https://github.com/farah-fouad16/fullstack-ecommerce-farah-fouad

Direct File Access (README):
https://github.com/farah-fouad16/fullstack-ecommerce-farah-fouad/blob/main/README.txt

------------------------------------------------------------------------
2. TECH STACK
------------------------------------------------------------------------
* Frontend:  React, Vite, React Router, Axios, Context API
* Backend:   Node.js, Express.js, Prisma ORM
* Testing:   Jest, React Testing Library, MSW (Mock Service Worker)
* DevOps:    Docker, Docker Compose

------------------------------------------------------------------------
3. PROJECT STRUCTURE
------------------------------------------------------------------------
fullstack-ecommerce-farah-fouad/
├── backend/
│   ├── prisma/             # Schema & database migrations
│   ├── src/                # Express API routes, controllers, middleware
│   ├── Dockerfile          # Container configuration for backend
│   └── package.json
├── frontend/
│   ├── src/                # React pages, components, contexts
│   ├── Dockerfile          # Container configuration for frontend
│   └── package.json
├── docker-compose.yml      # Orchestration for fullstack environment
└── README.txt              # Project submission documentation

------------------------------------------------------------------------
4. HOW TO RUN LOCALLY
------------------------------------------------------------------------
Option A: Using Docker Compose (Recommended)
1. Clone the repository:
   git clone https://github.com/farah-fouad16/fullstack-ecommerce-farah-fouad.git
2. Navigate into the project folder:
   cd fullstack-ecommerce-farah-fouad
3. Start the containers:
   docker-compose up --build

Option B: Manual Setup
1. Backend Setup:
   cd backend
   npm install
   npx prisma db push
   npm start

2. Frontend Setup:
   cd frontend
   npm install
   npm run dev

------------------------------------------------------------------------
5. TESTING
------------------------------------------------------------------------
* Run backend tests:  cd backend && npm test
* Run frontend tests: cd frontend && npm test

========================================================================
Submitted by farah-fouad16
========================================================================