import {
    BriefcaseIcon,
    Loader2,
    MailIcon,
    SparklesIcon,
    StarIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { CandidateAvatar } from '@/components/assessments/candidate-avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface AssessmentItem {
    completed: boolean;
    avg_rating: number;
    candidate: {
        avatar: string;
        email: string;
        name: string;
    };
    job: {
        title: string;
    };
    summary: {
        items: SummaryItem[];
    };
}

interface SummaryItem {
    uuid: string;
    question_summary: string;
    answer_summary: string;
}

export default function ViewAssessment({ uuid }: { uuid: string }) {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<AssessmentItem>();
    const [open, setOpen] = useState(false);

    const handleOpenChange = async (isOpen: boolean) => {
        setOpen(isOpen);

        if (!isOpen) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `/api/sparkhire/assessment-item/${uuid}`,
            );

            const data = await response.json();
            setResponse(data);
        } catch (error) {
            toast.error('Failed to fetch assessment.');
            console.log('Failed to fetch assessment. Error: ' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.preventDefault();
                        setOpen(true);
                    }}
                >
                    View
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-3xl!">
                {loading ? (
                    <Loader2 className={'animate-spin'} />
                ) : (
                    response && (
                        <div>
                            <DialogHeader>
                                <div className="mb-12 flex gap-2">
                                    <CandidateAvatar
                                        name={response.candidate.name}
                                        avatar={response.candidate.avatar}
                                        variant={'view'}
                                    />
                                    <div>
                                        <p className={'text-3xl font-medium'}>
                                            {response.candidate.name}
                                        </p>

                                        <div className="flex gap-2">
                                            <div
                                                className={
                                                    'flex items-center gap-1'
                                                }
                                            >
                                                <MailIcon size={13} />
                                                <p
                                                    className={
                                                        'text-sm font-normal'
                                                    }
                                                >
                                                    {response.candidate.email}
                                                </p>
                                            </div>
                                            <div
                                                className={
                                                    'flex items-center gap-1'
                                                }
                                            >
                                                <BriefcaseIcon size={13} />
                                                <p
                                                    className={
                                                        'text-sm font-normal'
                                                    }
                                                >
                                                    {response.job.title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogHeader>

                            {!response.completed ? (
                                <div className="flex justify-center">
                                    <p className={'mt-8'}>
                                        Assessment not completed yet
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <div className={'mb-6 flex gap-2'}>
                                        <p className={'text-xl'}>Evaluations</p>
                                        <Badge
                                            className={
                                                'rounded-xl bg-[#E5F5F0] text-sm text-[#0E6760]'
                                            }
                                        >
                                            <StarIcon />
                                            {response.avg_rating} team average
                                        </Badge>
                                    </div>
                                    <div className={'flex items-start gap-2'}>
                                        <Button
                                            className={'bg-gray-400 p-0!'}
                                            size={'icon-lg'}
                                            disabled={true}
                                        >
                                            <SparklesIcon size={40} />
                                        </Button>
                                        <div>
                                            <div>
                                                <p className={'font-medium'}>
                                                    Spark Hire AI
                                                </p>
                                                <div className={'flex gap-2'}>
                                                    <Badge
                                                        className={
                                                            'rounded-xl bg-[#E5F5F0] text-xs text-[#0E6760]'
                                                        }
                                                    >
                                                        strong
                                                    </Badge>
                                                    <p className={'text-sm'}>
                                                        5 days ago
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={'mt-3.5'}>
                                                <p className={'font-semibold'}>
                                                    AI Summary
                                                </p>
                                                {response.summary.items
                                                    ?.length > 0 &&
                                                    response.summary.items.map(
                                                        (item, index) => (
                                                            <p
                                                                key={item.uuid}
                                                                className={
                                                                    'text-sm'
                                                                }
                                                            >
                                                                Q{index + 1}.{' '}
                                                                {
                                                                    item.question_summary
                                                                }
                                                                :{' '}
                                                                {
                                                                    item.answer_summary
                                                                }
                                                            </p>
                                                        ),
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                )}
            </DialogContent>
        </Dialog>
    );
}
