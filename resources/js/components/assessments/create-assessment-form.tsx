import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useSparkhireOptions } from '@/hooks/use-sparkhire-options';
import { cn } from '@/lib/utils';

const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});

export function CreateAssessmentForm() {
    const { jobs, questionSets, loading: optionsLoading, error } = useSparkhireOptions();
    const deadlines = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);

        return {
            value: String(i + 1),
            label: `${formatter.format(date)} (${i + 1} day${i ? 's' : ''})`,
        };
    });
    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
        candidate_name: z.string().nonempty('Name is required'),
        candidate_email: z.email().nonempty('Email is required'),
        job_uuid: z.string().nonempty('Job is required'),
        question_set_uuid: z.string().nonempty('Question set is required'),
        deadline: z.string().min(1).max(30),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            candidate_name: '',
            candidate_email: '',
            job_uuid: '',
            question_set_uuid: '',
            deadline: '5',
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);

        fetch('/api/assessments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((e) => {
                console.error(e);
                toast.error('Error: ' + e.message);
            })
            .finally(() => setLoading(false));
    }

    if (optionsLoading) {
        return <Loader2 className="animate-spin" />;
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid items-start gap-4"
        >
            <FieldGroup className="max-w-[526px]">
                <Controller
                    name="candidate_name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor="form-rhf-demo-title"
                                className={'flex items-end'}
                            >
                                Name <small>(required)</small>
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-rhf-demo-title"
                                aria-invalid={fieldState.invalid}
                                placeholder="Full name"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="candidate_email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor="form-rhf-demo-title"
                                className={'flex items-end'}
                            >
                                Email <small>(required)</small>
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-rhf-demo-title"
                                aria-invalid={fieldState.invalid}
                                placeholder="name@email.com"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="job_uuid"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel
                                    htmlFor="form-rhf-select-language"
                                    className={'flex items-end'}
                                >
                                    Job <small>(required)</small>
                                </FieldLabel>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </FieldContent>
                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id="form-rhf-select-language"
                                    aria-invalid={fieldState.invalid}
                                    className="min-w-[120px]"
                                >
                                    <SelectValue placeholder="Select job" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    {jobs.map((job) => (
                                        <SelectItem
                                            key={job.uuid}
                                            value={job.uuid}
                                        >
                                            {job.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
                <Controller
                    name="question_set_uuid"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel
                                    htmlFor="form-rhf-select-language"
                                    className={'flex items-end'}
                                >
                                    Question set <small>(required)</small>
                                </FieldLabel>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </FieldContent>
                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id="form-rhf-select-language"
                                    aria-invalid={fieldState.invalid}
                                    className="min-w-[120px]"
                                >
                                    <SelectValue placeholder="Select question set" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    {questionSets.map((questionSet) => (
                                        <SelectItem
                                            key={questionSet.uuid}
                                            value={questionSet.uuid}
                                        >
                                            {questionSet.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
                <Controller
                    name="deadline"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel
                                    htmlFor="form-rhf-select-deadline"
                                    className={'flex items-end'}
                                >
                                    Deadline <small>(required)</small>
                                </FieldLabel>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </FieldContent>
                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id="form-rhf-select-deadline"
                                    aria-invalid={fieldState.invalid}
                                    className="min-w-[120px]"
                                >
                                    <SelectValue placeholder="Select deadline" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    {deadlines.map((deadline) => (
                                        <SelectItem
                                            key={deadline.value}
                                            value={deadline.value}
                                        >
                                            {deadline.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
            </FieldGroup>

            <Separator className={'mt-4'} />

            <div className="flex w-full justify-start gap-2">
                <Button
                    type="submit"
                    disabled={loading}
                    className={
                        'bg-[#004ECB] font-roboto font-medium hover:bg-white hover:text-[#004ECB]'
                    }
                >
                    {loading && <Loader2 className="animate-spin" />}
                    Create
                </Button>
                <Link
                    href="/"
                    className={cn(buttonVariants({ variant: 'secondary' }))}
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
