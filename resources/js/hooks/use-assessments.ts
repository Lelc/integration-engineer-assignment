import { useCallback, useEffect, useState } from 'react';
import type { Assessment } from '@/components/assessments/columns';

type AssessmentQuery = {
    page: number;
    per_page: number;
    order_by: {
        column: string;
        direction: 'asc' | 'desc';
    };
};

type AssessmentResponse = {
    data: Assessment[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export function useAssessments() {
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const [query, setQuery] = useState<AssessmentQuery>({
        page: 1,
        per_page: 10,
        order_by: {
            column: 'deadline',
            direction: 'asc',
        },
    });

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        perPage: 10,
        total: 0,
    });

    const loadAssessments = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: String(query.page),
                per_page: String(query.per_page),
                'order_by[column]': query.order_by.column,
                'order_by[direction]': query.order_by.direction,
            });

            const response = await fetch(`/api/assessments?${params}`);

            if (!response.ok) {
                throw new Error('Failed to load assessments.');
            }

            const result: AssessmentResponse = await response.json();

            setAssessments(result.data);

            setPagination({
                currentPage: result.current_page,
                lastPage: result.last_page,
                perPage: result.per_page,
                total: result.total,
            });
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        loadAssessments();
    }, [loadAssessments]);

    const setPage = (page: number) =>
        setQuery((q) => ({
            ...q,
            page,
        }));

    const setPerPage = (perPage: number) =>
        setQuery((q) => ({
            ...q,
            page: 1,
            per_page: perPage,
        }));

    const setOrderBy = (column: string, direction: 'asc' | 'desc') =>
        setQuery((q) => ({
            ...q,
            page: 1,
            order_by: {
                column,
                direction,
            },
        }));

    const refresh = () => loadAssessments();

    return {
        assessments,
        loading,
        error,

        currentPage: pagination.currentPage,
        lastPage: pagination.lastPage,
        perPage: pagination.perPage,
        total: pagination.total,
        orderBy: query.order_by,

        setPage,
        setPerPage,
        setOrderBy,
        refresh,
    };
}
