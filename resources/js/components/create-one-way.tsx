import { Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CreateOneWay() {
    return (
        <Link
            href="/create-assessment"
            className={cn(
                buttonVariants(),
                'bg-[#004ECB] font-roboto font-medium hover:bg-white hover:text-[#004ECB]',
            )}
        >
            Create One-Way
        </Link>
    );
}
