"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useJobs } from '@/context/JobsContext';
import { useToast } from '@/context/ToastContext';
import JobCard from '@/components/JobCard';
import JobDetailsModal from '@/components/JobDetailModal';
import type { Job } from '@/interface';

export default function SavedJobsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { jobs, savedJobs, savedLoading, fetchSavedJobs, deleteSavedJob } = useJobs() || { jobs: [], savedJobs: [], savedLoading: false, fetchSavedJobs: async () => {}, deleteSavedJob: async () => {} };
  const [showReminder, setShowReminder] = useState(false);
  const { showToast } = useToast();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal handlers must be defined before usage
  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleApply = (job: Job) => {
    showToast(`Apply for job: ${job.title}`, 'info');
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchSavedJobs(user.userId.toString());
  }, [user, fetchSavedJobs]);

  useEffect(() => {
    // Show reminder if there are saved jobs
    setShowReminder(savedJobs.length > 0);
  }, [savedJobs]);

  const handleDelete = async (jobId: string) => {
  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleApply = (job: Job) => {
    showToast(`Apply for job: ${job.title}`, 'info');
  };
    if (!user) return;
    const res = await deleteSavedJob(user.userId.toString(), jobId);
    if (res && typeof res === 'object' && 'success' in res) {
      if (res.success) {
        showToast('Job removed from saved jobs.', 'success');
      } else {
        showToast(res.error || 'Failed to remove job.', 'error');
      }
    } else {
      showToast('Failed to remove job.', 'error');
    }
  };

  // Get full job info for saved jobs
  const savedJobDetails: Job[] = jobs.filter(j => Array.isArray(savedJobs) && savedJobs.some(sj => sj.jobId === j.id));

  if (authLoading || savedLoading) return <div>Loading...</div>;

  return (
    <div className="mt-20 md:mt-24 px-4 md:px-12 py-6 max-w-5xl mx-auto">
      {showReminder && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center animate-bounce shadow-lg font-semibold">
          You have saved jobs! Don’t forget to apply.
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Saved Jobs</h1>
      {savedJobDetails.length === 0 ? (
        <div className="text-gray-500 text-center py-16 text-lg">No saved jobs yet. Save jobs from the job details modal!</div>
      ) : (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobDetails.map((job: Job) => (
            <div key={job.id} className="relative group cursor-pointer" onClick={() => handleViewJob(job)}>
              <JobCard job={job} />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow hover:bg-red-600 transition-opacity opacity-80 group-hover:opacity-100"
                onClick={e => { e.stopPropagation(); handleDelete(job.id); }}
                aria-label="Remove saved job"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <JobDetailsModal
          job={selectedJob}
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={() => {}}
          onApply={handleApply}
        />
        </>
      )}
    </div>
  );
}
