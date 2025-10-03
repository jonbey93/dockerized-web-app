import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h1>Profile</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "0.5rem", fontWeight: "bold" }}>ID:</td>
            <td style={{ padding: "0.5rem" }}>{user.id}</td>
          </tr>
          <tr>
            <td style={{ padding: "0.5rem", fontWeight: "bold" }}>Email:</td>
            <td style={{ padding: "0.5rem" }}>{user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
