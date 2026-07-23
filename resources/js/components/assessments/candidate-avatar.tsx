import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function CandidateAvatar({
    name,
    avatar,
    variant,
}: {
    name: string;
    avatar?: string;
    variant?: 'view';
}) {
    return (
        <Avatar className={`${variant === 'view' ? 'size-16' : ''}`}>
            <AvatarImage src={avatar} />
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
}
