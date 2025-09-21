"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
        router.push("/");
    }, 20000);

    return () => clearTimeout(timer);
}, [router]);

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center mb-6">
            <svg className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <h2 className="text-xl font-semibold text-blue-600">Loading...</h2>
        </div>
    </div>
);
}