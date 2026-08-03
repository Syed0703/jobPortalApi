# careerHub_Job_Portal

# 🚀 CareerHub

> A modern, full-stack job portal designed to bridge the gap between job seekers and employers, streamlining the path from unemployment to employment.
>
> 🌐 **Live Demo:** [careerhub.vercel.app](https://careerhub-lac.vercel.app/)  
📂 **Frontend Repo:** [github.com/Syed0703/careerHub_Frontend](https://github.com/Syed0703/careerHub_frontend)  
⚙️ **Backend Repo:** [github.com/Syed0703/careerHub_jobPortal_APi](https://github.com/Syed0703/careerHub_jobPortal_Api)

---

## 📌 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Environment Variables](#-environment-variables)
- [Folder Structure](#-folder-structure)
- [Future Improvements](#-future-improvements)

---

## 📖 About the Project

Finding a job can be an overwhelming, fragmented, and frustrating process. **CareerHub** was built to solve the core challenges faced by unemployed individuals and job seekers: fragmented job listings, opaque application statuses, and complex application processes.

By providing a central, user-friendly platform, CareerHub empowers job seekers to discover relevant opportunities, track their applications in real-time, and present their qualifications effectively. For recruiters, it offers a streamlined system to post openings, review candidate profiles, and manage applicants efficiently.

---

## ✨ Key Features

### 👨‍🎓 For Job Seekers
* **Advanced Job Search & Filtering:** Filter listings by keyword, location, job type (full-time, part-time, remote), and salary range.
* **User Authentication & Profile:** Secure sign-up/login with profile management, resume upload, and skills showcase.
* **One-Click Application:** Apply for open roles seamlessly using saved profile details.
* **Application Tracker:** Monitor application status in real-time (Applied, Interviewing, Accepted, Rejected).
* **Saved Jobs:** Bookmark listings to review or apply later.

### 🏢 For Recruiters / Employers
* **Job Management Dashboard:** Create, edit, and delete job postings with ease.
* **Applicant Review System:** View submitted candidate profiles and resumes directly from the portal.
* **Status Updates:** Update applicant statuses to keep candidates informed.

---

## 🛠️ Tech Stack

### **Frontend**
* **React.js** – UI Component library
* **Tailwind CSS** – Utility-first CSS framework for styling
* **shadcn/ui** – Accessible, customizable UI component system
* **Redux Toolkit** – Global state management
* **React Router DOM** – Client-side routing
* **Lucide React** – Icon library

### **Backend**
* **Node.js** – JavaScript runtime environment
* **Express.js** – Web framework for Node.js
* **MongoDB & Mongoose** – NoSQL database and object data modeling (ODM)
* **JSON Web Tokens (JWT)** – Secure authentication & authorization
* **Bcrypt.js** – Password hashing

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v16.x or higher)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
* [Git](https://git-scm.com/)

---

### Setup
Backend Setup:

**Bash**
cd backend
npm install
Create a .env file in the backend directory (see Environment Variables).

**Start the backend server:**

**Bash**
npm run dev
Frontend Setup:
Open a new terminal window:

**Bash**
cd frontend
npm install
Create a .env file in the frontend directory if necessary.

**Start the frontend server:**

**Bash**
npm run dev
Access the Application:
Open your browser and navigate to http://localhost:5173 (or the port specified by Vite/React).

**Environment Variables**
Create .env files in both directories based on the templates below:

**backend/.env**
Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUD_NAME=Cloudinary name
API_KEY=cloudinary api key
API_SECRET=cloudinary api secret

frontend/.env

Code snippet
VITE_API_BASE_URL=http://localhost:5000/api



**Future Improvements**

1. Email notifications for application status updates.

2. AI-powered job matching based on candidate skills.


