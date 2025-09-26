'use client';

import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";
import { useRouter } from "next/navigation";
import ProfileBasicInfo from "./ProfileBasicInfo";
import ProfileEditableFields from "./ProfileEditableFields";
import ProfileApplications from "./ProfileApplications";

export default function Profile() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = React.useState<any | null>(null);
    const [userApplications, setUserApplications] = React.useState<any[]>([]);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Fetch profile and applications from API
    useEffect(() => {
        if (user) {
            fetch(`/api/profile?userId=${user.userId}`)
                .then(res => res.json())
                .then((p) => setProfile(p));
            fetch(`/api/applications?userId=${user.userId}`)
                .then(res => res.json())
                .then((apps) => {
                    setUserApplications(
                        (apps as any[]).map(app => ({
                            ...app,
                            status: app.status as "Applied" | "Interviewing" | "Offered" | "Rejected"
                        }))
                    );
                });
        }
    }, [user]);

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


    if (!profile) {
        return <div className="p-6">Profile not found.</div>;
    }

        // Skeleton loader for profile sections
        if (loading || !profile) {
            return (
                <div className="min-h-screen overflow-hidden h-full w-full bg-white/90 backdrop-blur-sm animate-pulse">
                    <div className="mx-auto pt-24 flex flex-col md:flex-row gap-0 max-w-8xl">
                        {/* Left: Profile Basic Info Skeleton */}
                        <div className="h-full order-1 md:order-none md:w-1/4 flex-shrink-0">
                            <div className="bg-white/90 p-6 mb-4 md:mb-0 h-full rounded-xl">
                                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 mx-auto" />
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 mx-auto" />
                                <div className="h-3 bg-gray-100 rounded w-1/2 mb-2 mx-auto" />
                                <div className="h-3 bg-gray-100 rounded w-1/3 mx-auto" />
                            </div>
                        </div>
                        {/* Center: Editable Fields Skeleton */}
                        <div className="order-3 overflow-hidden h-full md:order-none md:flex-1">
                            <div className="bg-white/90 p-6 mb-4 md:mb-0 rounded-xl">
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                                <div className="h-3 bg-gray-100 rounded w-5/6 mb-2" />
                                <div className="h-3 bg-gray-100 rounded w-2/3 mb-2" />
                                <div className="h-3 bg-gray-100 rounded w-1/2" />
                            </div>
                        </div>
                        {/* Right: Profile Applications Skeleton */}
                        <div className="order-2 md:order-none md:w-1/3 flex-shrink-0">
                            <div className="bg-white/90 p-6 rounded-xl">
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                                <div className="h-3 bg-gray-100 rounded w-5/6 mb-2" />
                                <div className="h-3 bg-gray-100 rounded w-2/3 mb-2" />
                            </div>
                        </div>
                    </div>
                    <style jsx global>{`
                      .animate-pulse {
                        animation: pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite;
                      }
                      @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                      }
                    `}</style>
                </div>
            );
        }

        if (!user) {
            return <div className="p-6 animate-pulse">Redirecting to login...</div>;
        }

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
                <div className="order-3 overflow-auto h-full md:order-none md:flex-1">
                    <div className="bg-white/90 p-6 mb-4 md:mb-0">
                        <ProfileEditableFields profile={profile} />
                    </div>
                </div>
                {/* Right: Profile Applications */}
                <div className="order-2 md:order-none md:w-1/3 flex-shrink-0">
                    <div className="bg-white/90 p-6">
                        <ProfileApplications applications={userApplications} />
                        {/* No extra applied jobs section: all applications are shown above */}
                    </div>
                </div>
            </div>
        </div>
    );
        return (
            <div className="min-h-screen overflow-hidden h-full w-full bg-white/90 backdrop-blur-sm">
                <div className="mx-auto pt-24 flex flex-col md:flex-row gap-0 max-w-8xl">
                    {/* Left: Profile Basic Info */}
                    <div className="h-full order-1 md:order-none md:w-1/4 flex-shrink-0">
                        <div className="bg-white/90 p-6 mb-4 md:mb-0 h-full rounded-xl shadow-md transition-shadow hover:shadow-lg">
                            <ProfileBasicInfo profile={profile} />
                        </div>
                    </div>
                    {/* Center: Editable Fields */}
                    <div className="order-3 overflow-auto h-100 md:order-none md:flex-1">
                        <div className="bg-white/90 p-6 mb-4 md:mb-0 rounded-xl shadow-md transition-shadow hover:shadow-lg">
                            <ProfileEditableFields profile={profile} />
                        </div>
                    </div>
                    {/* Right: Profile Applications */}
                    <div className="order-2 md:order-none md:w-1/3 flex-shrink-0">
                        <div className="bg-white/90 p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg">
                            <ProfileApplications applications={userApplications} />
                        </div>
                    </div>
                </div>
            </div>
        );
}