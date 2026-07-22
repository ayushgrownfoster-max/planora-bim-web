"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen overflow-y-auto bg-[#060e1c] bg-gradient-to-br from-[#060e1c] via-[#0a1628] to-[#0d1f40] flex items-center justify-center p-4 sm:p-6">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Card Wrapper - Explicit inline min/max widths override any parent layout CSS */}
      <div
        className="relative z-10 w-full bg-[#0d1f40]/90 backdrop-blur-xl border border-blue-800/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-blue-900/40 my-auto"
        style={{ maxWidth: "420px", minWidth: "280px" }}
      >
        {/* Header / Logo */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-900/50 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 sm:w-7 sm:h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-white font-bold text-lg sm:text-xl tracking-wide">
              Planora Admin
            </h1>
            <p className="text-blue-400/70 text-[10px] sm:text-xs font-mono mt-1 tracking-wider uppercase">
              BIM Management Console
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 w-full">
          {/* Email Input */}
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="admin-email"
              className="text-[9px] sm:text-[10px] font-mono text-blue-300/70 uppercase tracking-widest block"
            >
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@planora.com"
              className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-lg bg-blue-950/60 border border-blue-700/40 text-white placeholder-blue-400/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all block box-border"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="admin-password"
              className="text-[9px] sm:text-[10px] font-mono text-blue-300/70 uppercase tracking-widest block"
            >
              Password
            </label>
            <div className="relative w-full">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full px-4 py-2.5 sm:py-3 pr-12 text-sm rounded-lg bg-blue-950/60 border border-blue-700/40 text-white placeholder-blue-400/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all block box-border"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400/50 hover:text-blue-300 p-1 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-red-900/20 border border-red-700/40 text-red-300 text-xs sm:text-sm w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <span className="break-words">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>Authenticating...</span>
              </>
            ) : (
              "Sign In to Admin Panel"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-blue-400/40 text-[9px] sm:text-[10px] font-mono mt-6 tracking-wider uppercase">
          PLANORA BIM ADMIN CONSOLE v1.0
        </p>
      </div>
    </div>
  );
}