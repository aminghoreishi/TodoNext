
# 📝 Todo App

A full-stack **Todo application** with user authentication.
Users can **sign up, log in, and manage todos** securely.

Built with:

* **Next.js** (frontend & backend routes)
* **MongoDB** (database)
* **bcrypt** (password hashing)
* **jsonwebtoken (JWT)** (authentication)
* **NProgress** (loading indicator)

---

## 🚀 Features

* 🔐 **User Authentication**

  * Sign Up with hashed password (`bcrypt`)
  * Login with secure JWT tokens
  * Protected API routes

* ✅ **Todo Management**

  * Create, Read, Update, Delete (CRUD) todos
  * Todos linked to the logged-in user only

* ⚡ **UX Enhancements**

  * NProgress loading bar on route changes
  * Responsive UI

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, React
* **Backend:** Next.js API Routes
* **Database:** MongoDB with Mongoose
* **Auth:** JWT + bcrypt
* **Styling:** Your choice (CSS/SCSS/Tailwind etc.)

---

## 📦 Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔑 Authentication Flow

1. User **signs up** → password hashed with **bcrypt** → stored in MongoDB
2. User **logs in** → server validates password → returns **JWT token**
3. JWT stored in **httpOnly cookie** → used to protect routes
4. NProgress shows a loading bar when navigating

---

## 📸 Screenshots (optional)

*Add screenshots of your app UI here.*

---

## 📚 Future Improvements

* Add social login (GitHub, Google)
* Dark mode
* Due dates & reminders

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes
4. Push to your fork and submit a PR

