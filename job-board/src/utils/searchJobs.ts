export async function searchJobs({
    company,
    location,
    page = 1,
    page_size = 20
    queryObjects,
    sort_by = 'relevance'
}: {
    company?: string;
    location?: string;
    page?: number;
    page_size?: number;
    queryObjects?: Record<string, any>;
    sort_by?: 'relevance' | 'date';
}) {
    const params = new URLSearchParams();
    if (company) params.append('company', company);
    if (location) params.append('location', location);
    if (page) params.append('page', page.toString());
    if (page_size) params.append('page_size', page_size.toString());
    if (sort_by) params.append('sort_by', sort_by);

    const res = await fetch(`https://api.example.com/jobs?${params.toString()}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY!,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch jobs');
    }
    return res.json();
}