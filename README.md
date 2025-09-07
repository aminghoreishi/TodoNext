# 📝 Todo List — Next.js + MongoDB

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?logo=nextdotjs\&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-18-149ECA?logo=react\&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-4EA94B?logo=mongodb\&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss\&logoColor=white)](#)
[![Dark Mode](https://img.shields.io/badge/Dark%20Mode-supported-6C63FF)](#)

A fast, SSR-enabled ✅ Todo app built with **Next.js (Pages Router)**, **MongoDB/Mongoose**, and a clean **Tailwind** UI. It supports auth, pagination, filtering, search, and create/update via a modal—optimized with React memoization for a snappy UX.

---

## ✨ Features

* 🔐 **SSR + Auth**: `getServerSideProps` reads a `token` cookie, verifies it, and fetches the signed-in user’s todos.
* 🧱 **CRUD**:

  * ➕ Create (via modal)
  * ✏️ Edit title (via modal)
  * ✅ Toggle `finish`
  * 🗑️ Delete
* 📑 **Pagination** with page pills.
* 🔎 **Filter & Search**: filter via query param; client-side title search for the current page.
* 🌗 **Dark mode** (via `next-themes`).
* ⚡ **Performance**: `useCallback`, `useMemo`, `React.memo` to reduce re-renders.
* 🙅 **Empty states**: friendly messages when there are no todos or no search results.
* 🆕 **Newest first**: supports sorting by `createdAt` so fresh todos appear top.

---

## 🧰 Tech Stack

* **Next.js** (Pages Router, SSR)
* **React 18**
* **MongoDB + Mongoose**
* **Tailwind CSS**
* **next-themes**, **react-icons**, **react-spinners**

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* MongoDB (local or Atlas)

### Install

```bash
# clone
git clone <your-repo-url>
cd <your-repo-folder>

# install deps
npm install
# or
yarn
```

### Environment Variables

Create `.env.local`:

```ini
# Mongo
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# JWT / Auth (used by utils/auth.verifyToekn)
JWT_SECRET=your-strong-secret
```

> Your auth flow should set a `token` cookie so `verifyToekn(token)` can identify the user on the server.

### Run

```bash
npm run dev
# http://localhost:3000
```

### Build & Start

```bash
npm run build
npm start
```

---

## 🗂️ Project Structure (high level)

```
/pages
  /api/todo
    index.js        # GET (paginated list), POST (create)
    [id].js         # DELETE, PATCH (finish/title)
  index.js          # HomePage + SSR (fetch user todos)
/components
  /module
    /Todo
      Todo.jsx
    /Modal
      Modal.jsx
  /template
    /SearchTodo
      SearchTodo.jsx
/utils
  db.js             # connectTodb()
  auth.js           # verifyToekn()
/models
  user.js
  todo.js           # Mongoose schema (timestamps recommended)
```

---

## 🔌 API Endpoints

### List Todos (paginated)

```
GET /api/todo?page=<number>&filter=<all|...>
Response: { todos: [...], totalPages: <number> }
```

> **Tip:** sort newest first on the server:

```js
// in /api/todo list route
const todos = await todoModel
  .find(query, "-__v")
  .sort({ createdAt: -1 })     // 🔝 newest first
  .skip((page - 1) * limit)
  .limit(limit);
```

### Create Todo

```
POST /api/todo
Body: { "title": "My task", "finish": false }
```

### Update Todo (finish or title)

```
PATCH /api/todo/:id
Body: { "finish": true }      // toggle completion
   or  { "title": "New title" }
```

### Delete Todo

```
DELETE /api/todo/:id
```

---

## 🧱 Data Model

Enable timestamps to make “newest first” trivial.

```js
// models/todo.js
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title:   { type: String, required: true },
    finish:  { type: Boolean, default: false },
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // createdAt, updatedAt
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
```

---

## 🖼️ UI/UX Notes

* **Modal** handles both **Create** and **Edit**:

  * `mode: "create" | "edit"`
  * `id` + `initialTitle` for editing
* **Search** is client-side (current page only). For global search, pass `search` to the API and filter server-side.
* **Empty states**:

  * No todos: *“You have no todos yet.”*
  * No results for a query: *“No results found for “{query}”* + **Clear search** button.
* **Optimizations**:

  * `useCallback` for `getAllTodoFunc`
  * `useMemo` for rendering lists
  * `React.memo` on containers/modal

---

## ✅ Roadmap

* 🔍 Server-side search (`search` query param)
* 🧩 Optimistic UI on create/edit
* 🧪 Tests (unit/e2e)
* 🌍 i18n (English/Persian)
* 🧰 Bulk actions (multi-select toggle/delete)

---

## ❤️ Acknowledgements

Built with Next.js & MongoDB, styled with Tailwind, and sprinkled with love.
