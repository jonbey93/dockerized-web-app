import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// Dummy page components for testing
function Landing() {
  return <h1>Landing Page</h1>;
}

function Login() {
  return <h1>Login Page</h1>;
}

function Register() {
  return <h1>Register Page</h1>;
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
