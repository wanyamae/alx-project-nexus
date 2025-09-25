'use client'
import React, { createContext, useContext, useState, useEffect,} from 'react';
import type { Job as JobType } from '@/interface';

const JobsContext = createContext<{ jobs: JobType[]; loading: boolean } | null>(null);

export const JobsProvider = ({ children} : { children: React.ReactNode }) => {
    const [jobs, setJobs] = useState<JobType[]>([]);
    const [loading, setLoading] = useState(true);

    

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

    return (
        <JobsContext.Provider value={{ jobs, loading }}>
            {children}
        </JobsContext.Provider>
    );
};

export const useJobs = () => useContext(JobsContext);