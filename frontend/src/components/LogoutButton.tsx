
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        alert("Logout failed. Please try again.");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch {
      alert("Something went wrong while logging out.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        padding: "10px 16px",
        background: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
