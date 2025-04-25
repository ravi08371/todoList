# React To-Do Application

This is a simple yet functional React-based To-Do application. It has login functionality , log in using a mobile number and password, and manage their personalized to-do list. All data is persisted in `localStorage` for one user at a time.

---

## 🔧 Features Implemented

- ✅ **User Authentication (localStorage-based)**  
  - New users can register with a mobile number and password.  
  - Existing users are authenticated and given access to their tasks.

- ✅ **To-Do List with CRUD Operations**  
  - Add, edit, delete, and mark tasks as complete.  
  - click the ✏️ icon to edit a task and click on enter to submit it.

- ✅ **Per-User Data Isolation**  
  - Each user sees only their own to-dos.

- ✅ **Task Counters**  
  - Shows count for Total, Completed (Done), and Pending tasks.

- ✅ **Logout Functionality**
  - Logout button to logout from the todo list.

- ✅ **Error Handling**  
  - Shows "Incorrect password" message if login fails.


---

## 🐞 Issues Faced & Solutions


### 1. Login Validation Logic  
**Problem**: Login would always create a new user even if the mobile number already existed.  
**Fix**: Added logic to check if the mobile number exists and match the password before proceeding.

### 2. Handling `process is not defined` Error  
**Problem**: Error appeared due to referencing `process.env` in frontend Vite-based code.  
**Fix**: Removed any unnecessary use of `process.env` in browser code or moved it to build tools where appropriate.

---

## 🧠 Technologies Used

- ⚛️ React
- 💾 localStorage
- 💅 SCSS (for styling)

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/ravi08371/todoList.git
cd react-to-do-app-challenge
npm install
npm start

hosted url link -> http://testuploadsss.s3-website.ap-south-1.amazonaws.com/#/todos
