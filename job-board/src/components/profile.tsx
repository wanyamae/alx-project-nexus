'use client';

import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import profiles from "@/data/profiles.json";
import applications from "@/data/applications.json";
import ProfileBasicInfo from "./ProfileBasicInfo";
import ProfileEditableFields from "./ProfileEditableFields";
import ProfileApplications from "./ProfileApplications";

export default function Profile() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!user) {
        return <div className="p-6">Redirecting to login...</div>;
    }

    // Find the profile for the logged-in user
    const profile = profiles.find((p) => p.userId === user.userId);
    if (!profile) {
        return <div className="p-6">Profile not found.</div>;
    }

    // Filter applications for the logged-in user
    const userApplications = applications
        .filter((app) => app.applicantId === user.userId)
        .map(app => ({
            ...app,
            status: app.status as "Applied" | "Interviewing" | "Offered" | "Rejected"
        }));

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400">
            {/* Add top padding to prevent overlap with header (adjust as needed) */}
            <div className="pt-24 pb-16 flex gap-8 max-w-6xl mx-auto">
                <div className="w-1/4">
                    <div className="bg-white/90 rounded-2xl shadow-lg p-6">
                        <ProfileBasicInfo profile={profile} />
                    </div>
                </div>
                <div className="w-2/4">
                    <div className="bg-white/90 rounded-2xl shadow-lg p-6">
                        <ProfileEditableFields profile={profile} />
                    </div>
                </div>
                <div className="w-1/4">
                    <div className="bg-white/90 rounded-2xl shadow-lg p-6">
                        <ProfileApplications applications={userApplications} />
                    </div>
                </div>
            </div>
        </div>
    );
}