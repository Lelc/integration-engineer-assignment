<?php

namespace App\Models;

use Database\Factories\AssessmentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
