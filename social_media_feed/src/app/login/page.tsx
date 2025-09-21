"use client";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/dist/client/components/navigation";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            router.push("/loading");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <div className="flex flex-col items-center mb-6">
                {/* Replace with your logo or an SVG */}
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#2563eb" />
                    <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">JB</text>
                </svg>
                <h1 className="text-2xl font-bold mt-2">Sign in to Job Board</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
                >
                    Sign in
                </button>
            </form>
            <div className="mt-6 text-center text-gray-500 text-xs">
                <span>Forgot your password? Contact admin.</span>
            </div>
        </div>
    </div>
  );
}