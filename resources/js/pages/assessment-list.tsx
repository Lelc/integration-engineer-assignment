import { Head } from '@inertiajs/react';
import type { Assessment } from '@/components/assessments/columns';
import { columns } from '@/components/assessments/columns';
import { DataTable } from '@/components/assessments/data-table';
import CreateOneWay from '@/components/create-one-way';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const assessments: Assessment[] = [];
export default function AssessmentList() {
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
                            <DataTable columns={columns} data={assessments} />
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
