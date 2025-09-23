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
        return (
            <div className="p-6">
                <h1 className="text-xl font-bold color-green-300 hover:animate-pulse">
                    Loading...
                </h1>
            </div>
        );
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
        <div className="min-h-screen overflow-hidden h-full w-full bg-white/90 backdrop-blur-sm">
            {/* Add top padding to prevent overlap with header (adjust as needed) */}
            <div className="mx-auto pt-24 flex flex-col md:flex-row gap-0 max-w-8xl">
                {/* Left: Profile Basic Info */}
                <div className="h-full order-1 md:order-none md:w-1/4 flex-shrink-0">
                    <div className="bg-white/90 p-6 mb-4 md:mb-0 h-full ">
                        <ProfileBasicInfo profile={profile} />
                    </div>
                </div>
                {/* Center: Editable Fields */}
                <div className="order-3 overflow-auto h-100 md:order-none md:flex-1">
                    <div className="bg-white/90 p-6 mb-4 md:mb-0">
                        <ProfileEditableFields profile={profile} />
                    </div>
                </div>
                {/* Right: Profile Applications */}
                <div className="order-2 md:order-none md:w-1/3 flex-shrink-0">
                    <div className="bg-white/90 p-6">
                        <ProfileApplications applications={userApplications} />
                    </div>
                </div>
            </div>
        </div>
    );
}