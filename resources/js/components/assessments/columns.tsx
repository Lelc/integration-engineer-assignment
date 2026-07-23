import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import DeleteAssessment from '@/components/assessments/delete-assessment';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function formatWithAt(date: Date) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    const parts = formatter.formatToParts(date);

    const get = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((p) => p.type === type)?.value ?? '';

    const datePart = `${get('month')} ${get('day')}, ${get('year')}`;
    const timePart = `${get('hour')}:${get('minute')} ${get('dayPeriod')}`;

    return `${datePart} at ${timePart}`;
}

export type Assessment = {
    uuid: string;
    candidate_name: string;
    candidate_email: string;
    candidate_avatar: string;
    type: string;
    job_title: string;
    status: string;
    submitted_at: string;
    deadline: string;
};

export function getColumns(
    onDelete: (uuid: string) => void,
): ColumnDef<Assessment>[] {
    return [
        {
            accessorKey: 'candidate_name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Candidate" />
            ),
            cell: ({ row }) => {
                const assessment = row.original;

                return (
                    <div className="flex items-center gap-2 font-medium">
                        <Avatar>
                            <AvatarImage src={assessment.candidate_avatar} />
                            <AvatarFallback>
                                {assessment.candidate_name
                                    .charAt(0)
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p>{assessment.candidate_name}</p>
                            <p className={'font-normal'}>
                                {assessment.candidate_email}
                            </p>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'type',
            header: 'Assessment type',
        },
        {
            accessorKey: 'job_title',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Job title" />
            ),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
        },
        {
            accessorKey: 'submitted_at',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Submitted at" />
            ),
            cell: ({ row }) => {
                const assessment = row.original;

                return assessment.submitted_at
                    ? formatWithAt(new Date(assessment.submitted_at))
                    : '-';
            },
        },
        {
            accessorKey: 'deadline',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Dealine" />
            ),
            cell: ({ row }) => {
                const assessment = row.original;

                return formatWithAt(new Date(assessment.deadline));
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const assessment = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>View </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <DeleteAssessment
                                    uuid={assessment.uuid}
                                    onDeleted={onDelete}
                                />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}
