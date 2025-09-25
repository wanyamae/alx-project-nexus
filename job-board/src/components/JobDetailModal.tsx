import React from 'react';
import type { Job } from '@/interface';

interface JobDetailsModalProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
  onSave: (job: Job) => void;
  onApply: (job: Job) => void;
}

export default function JobDetailModal({ job, open, onClose, onSave, onApply }: JobDetailsModalProps) {
  if (!open || !job) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-transparent"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-8 relative"
        onClick={e => e.stopPropagation()}
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
            onClick={() => {
              // Save job to localStorage (my-jobs)
              const stored = localStorage.getItem('savedJobs');
              let saved: Job[] = stored ? JSON.parse(stored) : [];
              if (!saved.some(j => j.id === job.id)) {
                saved = [job, ...saved];
                localStorage.setItem('savedJobs', JSON.stringify(saved));
              }
              onSave(job);
            }}
          >
            Save
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={() => onApply(job)}
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
    </div>
  );
}