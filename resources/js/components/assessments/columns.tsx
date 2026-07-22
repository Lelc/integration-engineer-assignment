import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDownIcon, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type Assessment = {
    candidate_name: string;
    candidate_email: string;
    candidate_avatar: string;
    type: string;
    job_title: string;
    status: string;
    submitted_at: string;
    deadline: string;
};

export const columns: ColumnDef<Assessment>[] = [
    {
        accessorKey: 'candidate_name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Candidate
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const assessment = row.original;

            return (
                <div className="flex items-center gap-2 font-medium">
                    <Avatar>
                        <AvatarImage src={assessment.candidate_avatar} />
                        <AvatarFallback>
                            {assessment.candidate_name.charAt(0).toUpperCase()}
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Job title
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Status
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'submittedAt',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Submitted at
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const assessment = row.original;

            return assessment.submitted_at ?? '-';
        },
    },
    {
        accessorKey: 'deadline',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Deadline
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
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
                        <DropdownMenuItem variant={'destructive'}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
