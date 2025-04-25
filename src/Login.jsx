import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Login = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const userTodos = JSON.parse(localStorage.getItem(mobileNo));
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedPassword = JSON.parse(localStorage.getItem("userPass"));

    // If user exists (based on mobile number)
    if (userTodos && storedUser?.mobileNo === mobileNo) {
      if (storedPassword?.password === password.trim()) {
        navigate("/todos");
      } else {
        alert("Incorrect password");
      }
    } else {
      // New user
      localStorage.setItem("user", JSON.stringify({ mobileNo }));
      localStorage.setItem("userPass", JSON.stringify({ password }));
      localStorage.setItem(mobileNo, JSON.stringify([]));
      alert("Welcome to Todo Application");
      navigate("/todos");
    }
  };

  return (
    <div className="login-container">
      <h2 className="app-title">Login</h2>
      <div className="form-group">
        <input
          type="mobileNo"
          placeholder="Enter your mobileNo"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
};

export default Login;
