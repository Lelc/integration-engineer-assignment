import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export default function DeleteAssessment({
    uuid,
    onDeleted,
}: {
    uuid: string;
    onDeleted: (uuid: string) => void;
}) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        try {
            const response = await fetch(`/api/assessments/${uuid}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                toast.error('Failed to delete assessment.');
            } else {
                toast.success('Assessment deleted');
                onDeleted(uuid);
            }
        } catch (error) {
            toast.error('Failed to delete assessment.');
            console.log('Failed to delete assessment. Error: ' + error);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    variant={'destructive'}
                    onSelect={(e) => {
                        e.preventDefault();
                        setOpen(true);
                    }}
                >
                    Delete
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This candidate will be permanently deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant={'destructive'}
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className={'animate-spin'} /> : ''}{' '}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
