"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import JobCard from '@/components/JobCard';
import type { Job } from '@/interface';

export default function SavedJobsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const stored = localStorage.getItem('savedJobs');
    if (stored) setSavedJobs(JSON.parse(stored));
  }, []);

  if (authLoading) return <div>Loading...</div>;

  return (
    <div className="mt-20 md:mt-24 px-4 md:px-12 py-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Saved Jobs</h1>
      {savedJobs.length === 0 ? (
        <div className="text-gray-500 text-center py-16 text-lg">No saved jobs yet. Save jobs from the job details modal!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job: Job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
