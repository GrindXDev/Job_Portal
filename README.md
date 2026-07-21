# 🚀 Job Portal - MERN Stack

A full-stack Job Portal web application built using the MERN stack that connects job seekers with recruiters. The platform allows users to search and apply for jobs, while recruiters can post and manage job listings through a dedicated admin dashboard.

## 📌 Features

### 👨‍💼 Job Seeker
- User Registration & Login
- JWT Authentication
- Browse available jobs
- Search and filter jobs
- View detailed job descriptions
- Apply for jobs
- Update profile information
- Upload resume

### 🏢 Recruiter/Admin
- Recruiter Registration & Login
- Company Management
- Create, Update & Delete Job Listings
- View applicants
- Manage posted jobs
- Dashboard for recruiters

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- shadcn/ui
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Bcrypt.js
- Cookie Parser

## 📂 Project Structure

```
Job-Portal/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── redux/
│   └── pages/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
│
└── README.md
```

## 🔐 Authentication

- JWT-based Authentication
- Protected Routes
- Password Hashing using bcrypt
- Role-Based Access (Student & Recruiter)

## 📸 Screenshots

Add screenshots of:
- Home Page
- Login Page
- Browse Jobs
- Job Details
- Profile Page
- Recruiter Dashboard
- Company Management
- Post Job Page

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/GrindXDev/job-portal.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🌐 Environment Variables

Create a `.env` file in the backend folder.

```env
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## 🚀 Future Improvements

- Email Notifications
- Resume Parsing
- AI-based Job Recommendations
- Interview Scheduling
- Company Reviews
- Dark Mode
- Job Bookmarking
- Pagination
- Admin Analytics Dashboard

## 💻 Learning Outcomes

This project helped me gain hands-on experience with:

- Full Stack Development
- REST API Development
- JWT Authentication
- MongoDB Database Design
- Redux Toolkit State Management
- File Upload using Multer
- Role-Based Authorization
- CRUD Operations
- Deployment

## 👨‍💻 Author

**Pritam Majumdar**

- GitHub:https://github.com/GrindXDev
- LinkedIn: https://www.linkedin.com/in/pritam-majumdar-8479113b5/
