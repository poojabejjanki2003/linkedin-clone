# 🧩 LinkedIn Clone – Simple Social Media Website

A mini LinkedIn-style social platform where users can **sign up, log in, create posts, and view a public feed** — built using **HTML, CSS, JavaScript (Frontend)** and **Node.js, Express.js, MySQL (Backend)**.

---

## 🚀 Live Demo

- **Frontend (Netlify/Vercel):** [https://your-frontend-link.netlify.app](https://your-frontend-link.netlify.app)  
- **Backend (Render/Railway):** [https://your-backend-link.onrender.com](https://your-backend-link.onrender.com)

---

## 📁 Folder Structure
linkedin/
│
├── backend/
│ ├── server.js
│ ├── db.js
│ ├── .env
│ ├── package.json
│ ├── /routes
│ │ ├── auth.js
│ │ └── posts.js
│ └── /models
│ └── tables.sql
│
└── frontend/
├── index.html
├── login.html
├── signup.html
├── /css/style.css
└── /js/posts.js


yml
---

## ⚙️ Tech Stack

### 🖥️ Frontend
- HTML5  
- CSS3  
- JavaScript  
- Bootstrap Icons  
- Responsive design inspired by **LinkedIn**

### ⚙️ Backend
- Node.js  
- Express.js  
- MySQL (Relational Database)  
- JWT (JSON Web Token) for authentication  
- bcrypt.js for password hashing  
- dotenv, cors

---

## 🌐 Features

✅ User Signup & Login (JWT authentication)  
✅ Secure password storage with bcrypt  
✅ Create and view posts (public feed)  
✅ Posts display username, content, and timestamp  
✅ Clean LinkedIn-like responsive UI  
✅ Logout functionality  

---

## 🧠 How to Run the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/poojabejjanki2003/linkedin.git
cd linkedin


2️⃣ Setup Backend
    cd backend
    npm install



Create a .env file:

    PORT=5000
    JWT_SECRET=secret123
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=linkedin


Run the database schema:
    source models/tables.sql;

Start the backend:

    npm run dev
    Server will run at: http://localhost:5000


3️⃣ Setup Frontend

    Open the frontend folder in VS Code

    Use Live Server to run index.html

    Make sure your API URL in frontend/js/posts.js matches your backend URL

☁️ Deployment

Frontend: Deployed on Netlify
 or Vercel

Backend: Deployed on Render
 or Railway

🧾 Example Credentials (for testing)

You can sign up with a new user or use:

Email: test@example.com
Password: 123456

👩‍💻 Author

Pooja Bejjanki
Final Year B.Tech – Computer Science Engineering
📍 Chaitanya Deemed to be University, Warangal

Connect:
LinkedIn | GitHub


📬 Submission Details

GitHub Repository Link → (Add your repo URL here)

Live Frontend Link → (Add Netlify/Vercel link here)

Live Backend Link → (Add Render/Railway link here)

Email submission to: hr@appdost.in


