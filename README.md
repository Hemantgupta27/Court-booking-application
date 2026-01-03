# Cridaa Turf & Court Booking

A modern, responsive web application for booking sports courts and turfs. Features a sleek UI, time slot selection, and booking management.

## 🚀 Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks (`useState`, `useEffect`)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: JSON file persistence (`server/data.json`)

## 🛠️ Prerequisites

- **Node.js**: (v18 or higher recommended)
- **npm**: (comes with Node.js)

## 📦 Setup & Installation

The project is divided into a **frontend** (root directory) and a **backend** (`server/` directory). You need to set up both.

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
cd ..
```

## 🏃‍♂️ Running the Application

You need to run the backend and frontend in separate terminal windows.

### 1. Start the Backend Server
The server runs on `http://localhost:5000`.

```bash
cd server
node index.js
```

### 2. Start the Frontend
The frontend runs on `http://localhost:5173`.

> **Note:** Due to special characters in the directory name, use the following command instead of `npm run dev` if you are on Windows:

```bash
node "node_modules\vite\bin\vite.js"
```


## 📖 API Documentation

Detailed API documentation is available in [API_DOCS.md](./API_DOCS.md).

**Key Endpoints:**
- `GET /api/slots`: Fetch available time slots
- `POST /api/bookings`: Create a new booking
- `GET /api/my-bookings`: Retrieve user bookings
- `DELETE /api/bookings/:id`: Cancel a booking

## ✨ Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Dynamic Booking**: Select range of time slots.
- **Real-time Availability**: Checks against backend for booked slots.
- **Booking Management**: View history and cancel upcoming bookings.
- **Search**: Lookup bookings by email address.
