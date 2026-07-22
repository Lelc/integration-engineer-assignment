import { Head } from '@inertiajs/react';
import { CreateAssessmentForm } from '@/components/assessments/create-assessment-form';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function CreateAssessment() {
    return (
        <>
            <Head title="Create One-Way Interview" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Candidate information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CreateAssessmentForm />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

CreateAssessment.layout = {
    breadcrumbs: [
        {
            title: 'Create One-Way Interview',
            href: '#',
        },
    ],
};
