import React, { useState } from "react";

// Import CSS for styling the modal and forms
import "./LoginSignup.css";

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // or "signup"
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [alert, setAlert] = useState(null);

  // Update form fields on change
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handler for login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    const usersStr = localStorage.getItem("users");
    const users = usersStr ? JSON.parse(usersStr) : [];
    const user = users.find((u) => u.email === inputs.email);

    if (!user) {
      setAlert({ type: "error", message: "No user found with this email" });
      return;
    }
    if (user.password !== inputs.password) {
      setAlert({ type: "error", message: "Incorrect password" });
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setAlert({ type: "success", message: `Welcome back, ${user.username}` });

    setTimeout(() => {
      setAlert(null);
      onAuthSuccess(user);
      onClose();
    }, 800);
  };

  // Handler for signup form submission
  const handleSignup = (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPass) {
      setAlert({ type: "error", message: "Passwords do not match" });
      return;
    }

    const usersStr = localStorage.getItem("users");
    const users = usersStr ? JSON.parse(usersStr) : [];

    if (users.find((u) => u.email === inputs.email)) {
      setAlert({ type: "error", message: "Email already registered" });
      return;
    }

    const newUser = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setAlert({ type: "success", message: "Registration successful! Logging in..." });

    setTimeout(() => {
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
      setAlert(null);
      onAuthSuccess(newUser);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form
          className="auth-form"
          onSubmit={mode === "login" ? handleLogin : handleSignup}
        >
          <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
          {alert && <div className={`alert ${alert.type}`}>{alert.message}</div>}

          {mode === "signup" && (
            <input
              name="username"
              type="text"
              value={inputs.username}
              placeholder="Username"
              required
              onChange={handleChange}
              autoComplete="username"
            />
          )}

          <input
            name="email"
            type="email"
            value={inputs.email}
            placeholder="Email"
            required
            onChange={handleChange}
            autoComplete="email"
          />

          <input
            name="password"
            type="password"
            value={inputs.password}
            placeholder="Password"
            required
            onChange={handleChange}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />

          {mode === "signup" && (
            <input
              name="confirmPass"
              type="password"
              value={inputs.confirmPass}
              placeholder="Confirm Password"
              required
              onChange={handleChange}
              autoComplete="new-password"
            />
          )}

          <button type="submit">{mode === "login" ? "Login" : "Sign Up"}</button>

          <p>
            {mode === "login" ? (
              <>
                New user?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  style={{
                    color: "#00b94d",
                    background: "none",
                    border: "none",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Sign up here
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  style={{
                    color: "#00b94d",
                    background: "none",
                    border: "none",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Login here
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
