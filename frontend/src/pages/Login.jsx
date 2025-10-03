import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { user, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {user ? (
        <>
          <p>✅ Logged in as {user.id} ({user.email})</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
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
          <p>❌ Not logged in</p>
        </>
      )}
    </div>
  );
}
