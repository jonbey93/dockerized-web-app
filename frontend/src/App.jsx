import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function Landing() {
  return <h1>Landing Page</h1>;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      await axios.post("/auth/login", { email, password });

      const res = await axios.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error("Login failed:", err);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>

      {user ? (
        <>
          <p>✅ Logged in as {user.id} ({user.email})</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>❌ Not logged in</p>
      )}
    </div>
  );
}

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      setMessage("✅ " + res.data.msg);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Registration failed"));
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}

function Profile() {
  return <h1>Profile</h1>;
}

export default function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Landing</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
