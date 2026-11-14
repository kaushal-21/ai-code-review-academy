
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "Login failed.");
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
    <main style={styles.main}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>
          Welcome back
        </h1>

        <p style={{ color: "#9ca3af", marginBottom: "24px" }}>
          Login to your AI Code Review Academy account.
        </p>

        <label>Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={styles.input}
        />

        <label>Password</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          style={styles.input}
        />

        {error && (
          <p style={{ color: "#f87171", marginBottom: "16px" }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "20px", color: "#9ca3af" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#60a5fa" }}>
            Register
          </a>
        </p>
      </form>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0b1120",
    color: "white",
    padding: "24px",
  },
  form: {
    width: "100%",
    maxWidth: "420px",
    background: "#151e30",
    padding: "32px",
    borderRadius: "14px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "18px",
    borderRadius: "8px",
    border: "1px solid #374151",
    background: "#0b1120",
    color: "white",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "12px",
  },
};
