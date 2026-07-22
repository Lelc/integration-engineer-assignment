import { useEffect, useState } from 'react';
import type { Job, QuestionSet } from '@/types/sparkhire';

export function useSparkhireOptions() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const [jobsResponse, questionSetsResponse] = await Promise.all([
                    fetch('/api/sparkhire/jobs'),
                    fetch('/api/sparkhire/question-sets'),
                ]);

                if (!jobsResponse.ok || !questionSetsResponse.ok) {
                    throw new Error('Failed to load Spark Hire data.');
                }

                const [jobs, questionSets] = await Promise.all([
                    jobsResponse.json(),
                    questionSetsResponse.json(),
                ]);

                setJobs(jobs);
                setQuestionSets(questionSets);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    return {
        jobs,
        questionSets,
        loading,
        error,
    };
}
