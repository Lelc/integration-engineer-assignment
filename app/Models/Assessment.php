<?php

namespace App\Models;

use Database\Factories\AssessmentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $uuid
 * @property string $type
 * @property string $status
 * @property string $candidate_name
 * @property string $candidate_email
 * @property string|null $candidate_avatar
 * @property string $job_uuid
 * @property string $job_title
 * @property \Carbon\CarbonImmutable|null $submitted_at
 * @property \Carbon\CarbonImmutable $deadline
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property \Carbon\CarbonImmutable|null $deleted_at
 * @method static \Database\Factories\AssessmentFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereCandidateAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereCandidateEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereCandidateName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereJobTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereJobUuid($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereSubmittedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment whereUuid($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Assessment withoutTrashed()
 * @mixin \Eloquent
 */
class Assessment extends Model
{
    /** @use HasFactory<AssessmentFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'type',
        'status',
        'candidate_name',
        'candidate_email',
        'candidate_avatar',
        'job_uuid',
        'job_title',
        'submitted_at',
        'deadline',
    ];

    protected function casts(): array
    {
        return [
            'deadline' => 'datetime',
            'submitted_at' => 'datetime',
        ];
    }
}
