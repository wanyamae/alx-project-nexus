'use client';
import React, { useState } from 'react';
import { useJobs } from '../context/JobsContext';
// import JobCard from '../components/JobCard';
import type { Job } from '@/interface';

export default function HomePage() {
  const { jobs, loading } = useJobs() || { jobs: [], loading: true };
  const [search, setSearch] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  if (loading) return <div>Loading jobs...</div>;

  const jobsArray: Job[] = Array.isArray(jobs) ? jobs : [];
  const filteredJobs = jobsArray.filter((job: Job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );
  const selectedJob = jobsArray.find(job => job.id === selectedJobId) || null;

  return (
    <div className="mt-20 md:mt-24 px-4 md:px-12 py-6 flex flex-col md:flex-row gap-6">
      {/* Job List */}
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Company</th>
                <th className="py-2 px-4 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job: Job) => (
                <React.Fragment key={job.id}>
                  <tr
                    className={`cursor-pointer hover:bg-blue-50 transition ${selectedJobId === job.id ? 'bg-blue-100' : ''}`}
                    onClick={() => setSelectedJobId(job.id)}
                  >
                    <td className="py-2 px-4 font-semibold">{job.title}</td>
                    <td className="py-2 px-4">{job.company}</td>
                    <td className="py-2 px-4">{job.location}</td>
                  </tr>
                  {/* On small screens, show details below selected row */}
                  <tr className="md:hidden">
                    <td colSpan={3} className="p-0">
                      {selectedJobId === job.id && (
                        <div className="bg-white border border-gray-200 rounded-b-lg p-4 shadow">
                          <div className="flex flex-col gap-4 items-start">
                            <img src={job.logoUrl} alt={job.company + ' logo'} className="w-20 h-20 object-contain rounded mb-4" />
                            <div>
                              <div className="text-xl font-bold mb-2">{job.title}</div>
                              <div className="mb-2 text-gray-700"><span className="font-semibold">Company:</span> {job.company}</div>
                              <div className="mb-2 text-gray-700"><span className="font-semibold">Location:</span> {job.location}</div>
                              <div className="mb-2 text-gray-700"><span className="font-semibold">Description:</span> {job.description}</div>
                              <div className="mb-2 text-gray-700"><span className="font-semibold">ID:</span> {job.id}</div>
                              <a
                                href={job.jobUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-2"
                              >
                                View Job Details
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* On medium/large screens: right column for details */}
      <div className="hidden md:block w-full md:w-1/2">
        {selectedJobId ? (
          (() => {
            const job = jobsArray.find(j => j.id === selectedJobId);
            if (!job) return null;
            return (
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <img src={job.logoUrl} alt={job.company + ' logo'} className="w-20 h-20 object-contain rounded mb-4 md:mb-0" />
                  <div>
                    <div className="text-2xl font-bold mb-2">{job.title}</div>
                    <div className="mb-2 text-gray-700"><span className="font-semibold">Company:</span> {job.company}</div>
                    <div className="mb-2 text-gray-700"><span className="font-semibold">Location:</span> {job.location}</div>
                    <div className="mb-2 text-gray-700"><span className="font-semibold">Description:</span> {job.description}</div>
                    <div className="mb-2 text-gray-700"><span className="font-semibold">ID:</span> {job.id}</div>
                    <a
                      href={job.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-2"
                    >
                      View Job Details
                    </a>
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="text-gray-500 text-center mt-12">Select a job to view details</div>
        )}
      </div>
    </div>
  );
}