'use client'
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Job as JobType } from '@/interface';


type SavedJob = { userId: string; jobId: string; savedAt: string };
type AppliedJob = { userId: string; jobId: string; appliedAt: string };

interface JobsContextType {
    jobs: JobType[];
    loading: boolean;
    savedJobs: SavedJob[];
    savedLoading: boolean;
    fetchSavedJobs: (userId: string) => Promise<void>;
    saveJob: (userId: string, jobId: string) => Promise<{ success: boolean; error?: string }>;
    deleteSavedJob: (userId: string, jobId: string) => Promise<{ success: boolean; error?: string }>;
    appliedJobs: AppliedJob[];
    addAppliedJob: (userId: string, jobId: string) => void;
}

const JobsContext = createContext<JobsContextType | null>(null);

export const JobsProvider = ({ children }: { children: React.ReactNode }) => {
    const [jobs, setJobs] = useState<JobType[]>([]);
    const [loading, setLoading] = useState(true);
    const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
    const [savedLoading, setSavedLoading] = useState(false);
    const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
    // Load applied jobs from localStorage (or could be from API in future)
    useEffect(() => {
        const stored = localStorage.getItem('appliedJobs');
        if (stored) setAppliedJobs(JSON.parse(stored));
    }, []);

    const addAppliedJob = useCallback((userId: string, jobId: string) => {
        setAppliedJobs(prev => {
            const already = prev.find(j => j.userId === userId && j.jobId === jobId);
            if (already) return prev;
            const updated = [...prev, { userId, jobId, appliedAt: new Date().toISOString() }];
            localStorage.setItem('appliedJobs', JSON.stringify(updated));
            return updated;
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch('/api/jobs')
            .then(res => res.json())
            .then((rows) => {
                setJobs(rows as JobType[]);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);


    const fetchSavedJobs = useCallback(async (userId: string) => {
        setSavedLoading(true);
        try {
            const res = await fetch(`/api/saved-jobs?userId=${userId}`);
            const data = await res.json();
            setSavedJobs(data);
        } catch {
            setSavedJobs([]);
        } finally {
            setSavedLoading(false);
        }
    }, []);

    const saveJob = useCallback(async (userId: string, jobId: string) => {
        try {
            const res = await fetch('/api/saved-jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, jobId })
            });
            const data = await res.json();
            if (data.success) {
                setSavedJobs(prev => [...prev, { userId, jobId, savedAt: new Date().toISOString() }]);
            }
            return data;
        } catch (e: any) {
            return { success: false, error: e.message };
        }
    }, []);

    const deleteSavedJob = useCallback(async (userId: string, jobId: string) => {
        try {
            const res = await fetch('/api/saved-jobs', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, jobId })
            });
            const data = await res.json();
            if (data.success) {
                setSavedJobs(prev => prev.filter(j => !(j.userId === userId && j.jobId === jobId)));
            }
            return data;
        } catch (e: any) {
            return { success: false, error: e.message };
        }
    }, []);

    return (
        <JobsContext.Provider value={{ jobs, loading, savedJobs, savedLoading, fetchSavedJobs, saveJob, deleteSavedJob, appliedJobs, addAppliedJob }}>
            {children}
        </JobsContext.Provider>
    );
};

export const useJobs = () => useContext(JobsContext);