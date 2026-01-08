# Ziksir - Notes Application

A modern, full-stack MERN notes application with user authentication, note management, and time-based filtering.

## Live Demo

🔗 **[Live Application](https://ziksirnotes.netlify.app/)**

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Note Management**: Create, read, update, and delete notes
- **Time-based Filtering**: View notes by Today, This Week, This Month, or All
- **Search**: Quick search through note titles
- **Responsive UI**: Clean, modern interface with Tailwind CSS
- **Real-time Updates**: Instant UI updates after note operations

## Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Formik & Yup (form validation)
- React Router (navigation)
- Axios (API calls)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt (password hashing)

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB instance (local or cloud)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file in `backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

3. Start backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Create `.env` file in `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000
```

3. Start frontend development server:
```bash
npm run dev
```

## Deployment

### Backend Deployment
- Set environment variables on your hosting platform
- Ensure MongoDB connection string is accessible
- Update CORS settings if needed in `server.js`

### Frontend Deployment
- Update `VITE_API_URL` to your production backend URL
- Build the frontend: `npm run build`
- Deploy the `dist/` folder to your hosting service

## API Endpoints

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

**Notes (Protected):**
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## Project Structure

```
ziksir/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── services/
    └── index.html
```
