<?php

namespace App\Services;

use App\DTOs\AssessmentIndexDTO;
use App\DTOs\CreateAssessmentDTO;
use App\Interfaces\SparkHireServiceInterface;
use App\Models\Assessment;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

readonly class AssessmentService
{
    public function __construct(private SparkHireServiceInterface $sparkHireService) {}

    public function index(AssessmentIndexDTO $dto): LengthAwarePaginator
    {
        return Assessment::query()
            ->orderBy($dto->order_by['column'], $dto->order_by['direction'])
            ->paginate(perPage: $dto->per_page, page: $dto->page);
    }

    public function show(string $uuid): ?Assessment
    {
        return Assessment::query()->where('uuid', $uuid)->first();
    }

    public function store(CreateAssessmentDTO $dto): ?Assessment
    {
        $response = $this->sparkHireService->createAssessment($dto);

        if (! $this->isAssessmentCreated($response)) {
            return null;
        }

        return $this->createAssessmentFromPayload($response[0]);
    }

    public function destroy(string $uuid): bool
    {
        $assessment = Assessment::query()->where('uuid', $uuid)->first();

        return (bool) $assessment?->delete();
    }

    public function restore(string $uuid): bool
    {
        $assessment = Assessment::onlyTrashed()->where('uuid', $uuid)->first();

        return (bool) $assessment?->restore();
    }

    public function createAssessmentFromPayload(array $attributes): ?Assessment
    {
        return DB::transaction(function () use ($attributes): ?Assessment {
            $assessment = Assessment::query()
                ->withTrashed()
                ->whereUuid($attributes['uuid'])
                ->first();

            if ($assessment && $assessment->trashed()) {
                return null;
            }

            return Assessment::updateOrCreate(
                ['uuid' => Arr::get($attributes, 'uuid')],
                [
                    'type' => Arr::get($attributes, 'type'),
                    'status' => Arr::get($attributes, 'status'),
                    'candidate_name' => Arr::get($attributes, 'candidate.name'),
                    'candidate_email' => Arr::get($attributes, 'candidate.email'),
                    'candidate_avatar' => Arr::get($attributes, 'candidate.avatar'),
                    'job_uuid' => Arr::get($attributes, 'job.uuid'),
                    'job_title' => Arr::get($attributes, 'job.title'),
                    'deadline' => Arr::get($attributes, 'due_at'),
                    'submitted_at' => Arr::get($attributes, 'completed_at'),
                ],
            );
        });
    }

    private function isAssessmentCreated(?array $response): bool
    {
        return is_array($response) && count($response) === 1 && isset($response[0]['uuid']);
    }
}
