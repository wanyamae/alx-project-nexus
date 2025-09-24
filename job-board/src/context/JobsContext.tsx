'use client'
import React, { createContext, useContext, useState, useEffect,} from 'react';
import jobsData from '@/data/jobs.json';
import type { Job as JobType } from '@/interface';

const JobsContext = createContext<{ jobs: JobType[]; loading: boolean } | null>(null);

export const JobsProvider = ({ children} : { children: React.ReactNode }) => {
    const [jobs, setJobs] = useState<JobType[]>([]);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        // Simulate API call with delay
        setLoading(true);
        setTimeout(() => {
            setJobs(jobsData);
            setLoading(false);
        }, 800); // 800ms delay
    }, []);

    return (
        <JobsContext.Provider value={{ jobs, loading }}>
            {children}
        </JobsContext.Provider>
    );
};

export const useJobs = () => useContext(JobsContext);