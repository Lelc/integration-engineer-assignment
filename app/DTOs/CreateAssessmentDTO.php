<?php

namespace App\DTOs;

use App\DTOs\Casters\DeadlineCast;
use WendellAdriel\ValidatedDTO\Casting\StringCast;
use WendellAdriel\ValidatedDTO\ValidatedDTO;

final class CreateAssessmentDTO extends ValidatedDTO
{
    public string $candidate_name;
    public string $candidate_email;
    public string $job_uuid;
    public string $question_set_uuid;
    public string $deadline;

    protected function rules(): array
    {
        return [
            'candidate_name' => ['required', 'string'],
            'candidate_email' => ['required', 'email'],
            'job_uuid' => ['required', 'string'],
            'question_set_uuid' => ['required', 'string'],
            'deadline' => ['required', 'integer', 'min:1', 'max:30'],
        ];
    }

    protected function defaults(): array
    {
        return [];
    }

    protected function casts(): array
    {
        return [
            'candidate_name' => new StringCast(),
            'candidate_email' => new StringCast(),
            'job_uuid' => new StringCast(),
            'question_set_uuid' => new StringCast(),
            'deadline' => new DeadlineCast(),
        ];
    }
}
