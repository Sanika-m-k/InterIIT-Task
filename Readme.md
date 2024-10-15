# Godown Inventory Management System

This is a Godown Inventory Management system built using React.js for the frontend and Node.js for the backend. The app uses JWT tokens for authentication and provides protected routes for viewing item details, searching, and filtering items. The application implements a tree view to display locations, sub-locations of godowns, and the items stored in them. The backend is powered by MongoDB Atlas, and the entire system is dockerized for easy deployment.

## Features

- **Tree View**: Visual representation of godowns and their sub-locations. Items are listed under locations, and item details can be viewed on click.
- **Authentication**: JSON Web Tokens (JWT) are used to protect routes and provide secure authentication.
- **Search and Filter**: Users can search for items based on various parameters such as category, price, brand, and availability (in stock or out of stock).
- **Protected Routes**: The `/search`, `/:item_id`, and other sensitive routes are protected by JWT authentication.
- **Dockerized Deployment**: Both frontend and backend are containerized using Docker for easy deployment.

## Technology Stack

- **Frontend**: React.js (with Yarn for package management)
- **Backend**: Node.js (with Yarn for package management)
- **Database**: MongoDB Atlas
- **Authentication**: JWT tokens
- **Containerization**: Docker

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

### Installation

#### Clone the repository:

```bash
git clone https://github.com/Sanika-m-k/InterIIT-Task.git

Backend:
cd backend
yarn install
yarn start

Frontend:
cd frontend
yarn install
yarn start

Docker:
docker-compose build
docker-compose up 
```

## usage
| METHOD  | LINK |
| ------------- | ------------- |
| GET  | http://localhost:5000/api/items/location/:godown_id |
| GET  | http://localhost:5000/api/items/:item_id |
| GET  |  http://localhost:5000/api/locations/:id/sublocations|
| GET  |  http://localhost:5000/api/locations/main|
| GET  |  http://localhost:5000/api/search|
| POST  | http://localhost:5000/auth/login  |
