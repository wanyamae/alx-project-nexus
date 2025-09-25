import React from 'react';
import { Job } from '@/interface';

export default function JobCard({
  job,
  onViewDetails,
}: {
  job: Job;
  onViewDetails?: (job: Job) => void;
}) {
  return (
    <article
      className="rounded-xl shadow-md bg-white hover:shadow-lg transition p-6 flex flex-col gap-4 border border-gray-100 focus-within:ring-2 focus-within:ring-blue-500"
      tabIndex={0}
      aria-label={`Job card for ${job.title} at ${job.company}`}
    >
      <div className="flex items-center gap-3">
        <img
          src={job.logoUrl}
          alt={`${job.company} logo`}
          className="w-12 h-12 object-contain rounded-md bg-gray-50"
          loading="lazy"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{job.title}</h2>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
      </div>
      <div className="text-gray-700 text-sm">{job.location}</div>
      <div className="text-gray-600 text-xs line-clamp-2">{job.description}</div>
      <button
        className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`View details for ${job.title} at ${job.company}`}
        onClick={e => {
          e.stopPropagation();
          onViewDetails?.(job);
        }}
      >
        View Job Details
      </button>
    </article>
  );
}