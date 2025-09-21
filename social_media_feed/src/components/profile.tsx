'use client';
import React, { use, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import profiles from "@/data/profiles.json";

export default function Profile() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }

    }, [user, router]);

    if (!user) {
        return <div className="p-6">Redirecting to login...</div>;
    }

    const profile = profiles.find((p) => p.userId === user.userId)
    if (!profile) {
        return <div className="p-6">Profile not found.</div>;
    }

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <img src={profile.avatarUrl} alt="Avatar" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <div className="text-center">
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="mt-2">{profile.bio}</p>
            </div>
        </div>
    )
}