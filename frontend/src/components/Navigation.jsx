import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navigation({ links }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
      {links.map(({ label, path }) => (
        <button key={path} onClick={() => navigate(path)}>
          {label}
        </button>
      ))}
    </div>
  );
}
