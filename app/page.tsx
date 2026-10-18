
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (email.trim() === "") {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@gmail\.com$/i.test(email.trim())) {
      setError("Please enter a valid Gmail address ending in @gmail.com.");
      return;
    }

    if (password.length <= 6) {
      setError("Password must be more than 6 characters.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    router.push("/notes");
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-icon">✦</div>

        <p className="login-label">WELCOME BACK</p>
        <h1>Sign in</h1>
        <p className="login-description">
          Enter your details to access your notes.
        </p>

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="you@gmail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" className="login-button">
          Login <span>→</span>
        </button>

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <p className="login-footer">
          Your ideas deserve a safe place.
        </p>
      </form>
    </main>
  );
}
