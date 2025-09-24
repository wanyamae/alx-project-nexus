'use client'
import React from 'react';
import { Job } from '@/interface'



export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="rounded-lg shadow mb-4 hover:shadow-lg transition p-4 bg-white hover:outline-2 hover:outline-blue-500">
    
    {/* Job Title and ID */}
    <div className="flex items-center mb-2">
        <span className="text-lg font-bold text-gray-800">{job.title}</span>
        <span className="ml-4 text-sm text-gray-400">ID: {job.id}</span>
    </div>
    
    {/* Other details */}
    <div className="mb-2">
        <div className="text-sm text-gray-700">{job.location}</div>
        {/* ...other fields */}
        {Object.entries(job).map(([key, value]) =>
            !['id', 'title'].includes(key) && (
            <div key={key} className="text-sm text-gray-700">
                <span className="font-semibold capitalize">{key}:</span> {String(value)}
            </div>
  )
)}
    </div>
    
    {/* Redirect button at the end */}
    <div className="mt-4">
        <a
        href={job.jobUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
        View Job Details
        </a>
    </div>
    </div>
  );
}
