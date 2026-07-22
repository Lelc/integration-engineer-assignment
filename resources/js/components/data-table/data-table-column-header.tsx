import type { Column } from '@tanstack/react-table';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps<
    TData,
    TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    const sorted = column.getIsSorted();

    return (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn('-ml-3 h-8 data-[state=open]:bg-accent', className)}
            onClick={() => column.toggleSorting(sorted === 'asc')}
        >
            <span>{title}</span>
            {sorted === 'asc' ? (
                <ChevronUp className="ml-2 size-4" />
            ) : sorted === 'desc' ? (
                <ChevronDown className="ml-2 size-4" />
            ) : (
                <ChevronsUpDown className="ml-2 size-4 text-muted-foreground" />
            )}
        </Button>
    );
}
