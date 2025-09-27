
import React, { useEffect, useRef } from 'react';
import type { Job } from '@/interface';
import { useJobs } from '@/context/JobsContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

interface JobDetailsModalProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
  onSave: (job: Job) => void;
  onApply: (job: Job) => void;
}


const JobDetailModal: React.FC<JobDetailsModalProps> = ({
  job,
  open,
  onClose,
  onSave,
  onApply,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { saveJob } = useJobs() || {};
  const { user } = useAuth() || {};
  const { showToast } = useToast();

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  if (!open || !job) return null;
  // Debug log for modal open and job
  console.log('[DEBUG] JobDetailModal open:', open, 'job:', job);

  const handleSave = async () => {
    if (!user || !saveJob) {
      showToast('You must be logged in to save jobs.', 'error');
      return;
    }
    const res = await saveJob(user.userId.toString(), job.id);
    if (res && res.success) {
      showToast('Job saved successfully!', 'success');
      onSave(job);
    } else {
      showToast(res?.error || 'Failed to save job.', 'error');
    }
  };


  // POST application to DB on apply
  const handleApplyClick = async () => {
    if (!user) {
      showToast('You must be logged in to apply.', 'error');
      return;
    }
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.userId,
          jobId: job.id,
          jobTitle: job.title,
          status: 'Applied',
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Application submitted!', 'success');
        onApply(job);
      } else {
        showToast(data.error || 'Failed to apply.', 'error');
      }
    } catch {
      showToast('Failed to apply.', 'error');
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-transparent animate-fadein"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-8 relative scale-100 animate-modalpop"
        onClick={e => e.stopPropagation()}
        style={{ transition: 'transform 0.2s' }}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex items-center gap-4 mb-4">
          <img src={job.logoUrl} alt={`${job.company} logo`} className="w-16 h-16 object-contain rounded" />
          <div>
            <h2 className="text-xl font-bold">{job.title}</h2>
            <div className="text-gray-600">{job.company}</div>
            <div className="text-gray-500 text-sm">{job.location}</div>
          </div>
        </div>
        <div className="mb-4 text-gray-700">{job.description}</div>
        <div className="flex gap-3 mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={handleApplyClick}
          >
            Apply
          </button>
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition inline-block"
          >
            Go to Site
          </a>
        </div>
      </div>
      <style jsx global>{`
        .animate-fadein { animation: fadeIn 0.3s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-modalpop { animation: modalPop 0.25s cubic-bezier(0.4,0,0.2,1); }
        @keyframes modalPop { from { transform: scale(0.96); opacity: 0.7; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default JobDetailModal;