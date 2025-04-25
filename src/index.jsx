import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { App } from "./app";
import Login from "./Login";

const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return !!user?.mobileNo;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const Main = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated() ? "/todos" : "/login"} />}
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
