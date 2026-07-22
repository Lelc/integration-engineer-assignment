import { Head } from '@inertiajs/react';
import type { PaginationState, SortingState } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { columns } from '@/components/assessments/columns';
import CreateOneWay from '@/components/create-one-way';
import { DataTable } from '@/components/data-table/data-table';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useAssessments } from '@/hooks/use-assessments';

export default function AssessmentList() {
    const {
        assessments,
        loading,
        currentPage,
        lastPage,
        perPage,
        total,
        orderBy,
        setPage,
        setPerPage,
        setOrderBy,
    } = useAssessments();

    const pagination: PaginationState = useMemo(
        () => ({ pageIndex: currentPage - 1, pageSize: perPage }),
        [currentPage, perPage],
    );

    const sorting: SortingState = useMemo(
        () => [{ id: orderBy.column, desc: orderBy.direction === 'desc' }],
        [orderBy],
    );

    const handlePaginationChange = useCallback(
        (
            updater:
                PaginationState | ((old: PaginationState) => PaginationState),
        ) => {
            const next =
                typeof updater === 'function' ? updater(pagination) : updater;

            if (next.pageSize !== pagination.pageSize) {
                setPerPage(next.pageSize);
            } else if (next.pageIndex !== pagination.pageIndex) {
                setPage(next.pageIndex + 1);
            }
        },
        [pagination, setPage, setPerPage],
    );

    const handleSortingChange = useCallback(
        (updater: SortingState | ((old: SortingState) => SortingState)) => {
            const next =
                typeof updater === 'function' ? updater(sorting) : updater;
            const [first] = next;

            if (first) {
                setOrderBy(first.id, first.desc ? 'desc' : 'asc');
            }
        },
        [sorting, setOrderBy],
    );

    return (
        <>
            <Head title="Assessment List" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {assessments.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>No assessments found</CardTitle>
                            <CardDescription>
                                Create your first assessment
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CreateOneWay />
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent>
                            <DataTable
                                columns={columns}
                                data={assessments}
                                total={total}
                                pageCount={lastPage}
                                pagination={pagination}
                                sorting={sorting}
                                onPaginationChange={handlePaginationChange}
                                onSortingChange={handleSortingChange}
                                loading={loading}
                            />
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

AssessmentList.layout = {
    breadcrumbs: [
        {
            title: 'Assessment List',
            href: '#',
        },
    ],
};
