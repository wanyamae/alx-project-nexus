'use client';
import { useState, useEffect } from 'react';
import { useJobs } from '../context/JobsContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from '../context/ToastContext';
import JobCard from '../components/JobCard';
import JobDetailsModal from '../components/JobDetailModal';
import type { Job } from '@/interface';

export default function HomePage() {
  const { jobs, loading } = useJobs() || { jobs: [], loading: true };
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const JOB_LIMIT = 100;
  const [activeFilter, setActiveFilter] = useState<'all' | 'recent'>('all');
  const { showToast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewedJobs');
    if (stored) setRecentlyViewed(JSON.parse(stored));
  }, []);

  if (loading || authLoading) return <div>Loading jobs...</div>;

  const jobsArray: Job[] = Array.isArray(jobs) ? jobs : [];
  let filteredJobs = jobsArray.filter((job: Job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );
  if (activeFilter === 'recent') {
    filteredJobs = [...recentlyViewed];
  }
  filteredJobs = filteredJobs.slice(0, JOB_LIMIT);

  // Add job to recently viewed
  const handleViewJob = (job: Job) => {
    console.log('[DEBUG] handleViewJob called with:', job);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(j => j.id !== job.id);
      const updated = [job, ...filtered].slice(0, 5);
      localStorage.setItem('recentlyViewedJobs', JSON.stringify(updated));
      return updated;
    });
    setSelectedJob(job);
    setIsModalOpen(true);
    setTimeout(() => {
      console.log('[DEBUG] selectedJob:', job, 'isModalOpen:', true);
    }, 0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleSave = (job: Job) => {
    showToast(`Saved job: ${job.title}`, 'success');
  };

  const handleApply = (job: Job) => {
    showToast(`Apply for job: ${job.title}`, 'info');
  };

  interface RecentlyViewedClickHandler {
    (job: Job): void;
  }

  const handleRecentlyViewedClick: RecentlyViewedClickHandler = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  
  return (
    <div className="mt-20 md:mt-24 px-4 md:px-12 py-6 flex flex-col lg:flex-row gap-8">
      {/* Main job cards grid */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        {/* Filter buttons */}
        <div className="mb-4 flex gap-2">
          <button
            className={`px-3 py-1 rounded border text-sm font-medium transition-colors ${activeFilter === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
            onClick={() => setActiveFilter('all')}
            aria-pressed={activeFilter === 'all'}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded border text-sm font-medium transition-colors ${activeFilter === 'recent' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
            onClick={() => setActiveFilter('recent')}
            aria-pressed={activeFilter === 'recent'}
          >
            Recent
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job: Job) => (
            <JobCard key={job.id} job={job} onViewDetails={handleViewJob} />
          ))}
        </div>
      </div>
      {/* Recently viewed sidebar */}
      <aside className="w-full lg:w-72 mt-8 lg:mt-0">
        <h3 className="font-bold text-lg mb-4">Recently Viewed</h3>
        <ul className="space-y-3" aria-label="Recently viewed jobs">
          {recentlyViewed.length === 0 && (
            <li className="text-gray-400 text-sm">No jobs viewed yet.</li>
          )}
          {recentlyViewed.map(job => (
            <li
              key={job.id}
              className="flex items-center gap-3 bg-gray-50 rounded p-2"
              onClick={() => handleRecentlyViewedClick(job)}
            >
              <img src={job.logoUrl} alt="" className="w-8 h-8 object-contain rounded" />
              <div>
                <div className="font-medium text-sm">{job.title}</div>
                <div className="text-xs text-gray-500">{job.company}</div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJob}
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        onApply={handleApply}
      />
    </div>
  );
}