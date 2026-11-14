
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setError(error.message || "Registration failed.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0b1120",
      color: "white",
      padding: "24px"
    }}>
      <form
        onSubmit={handleRegister}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#151e30",
          padding: "32px",
          borderRadius: "14px"
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>
          Create your account
        </h1>

        <p style={{ color: "#9ca3af", marginBottom: "24px" }}>
          Join the AI Code Review Academy.
        </p>

        <label>Name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={inputStyle}
        />

        <label>Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={inputStyle}
        />

        <label>Password</label>
        <input
          required
          type="password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          style={inputStyle}
        />

        {error && (
          <p style={{ color: "#f87171", marginBottom: "16px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "12px"
          }}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p style={{ marginTop: "20px", color: "#9ca3af" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#60a5fa" }}>
            Login
          </a>
        </p>
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #374151",
  background: "#0b1120",
  color: "white",
  boxSizing: "border-box"
};
