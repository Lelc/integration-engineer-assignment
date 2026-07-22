<?php

namespace App\Services\Integrations\SparkHire;

use App\DTOs\CreateAssessmentDTO;
use App\Interfaces\SparkHireServiceInterface;
use Illuminate\Support\Facades\Cache;

readonly class SparkHireService implements SparkHireServiceInterface
{
    public function __construct(private SparkHireClient $client)
    {
    }

    public function createAssessment(CreateAssessmentDTO $dto): ?array
    {
        return $this->client->request('POST', '/partners/candidate_assessment_items', [
            'type' => 'one_way',
            'job_uuid' => $dto->job_uuid,
            'question_set_uuid' => $dto->question_set_uuid,
            'candidates' => [
                ['name' => $dto->candidate_name, 'email' => $dto->candidate_email],
            ],
            'due_at' => $dto->deadline,
        ]);
    }

    public function jobs(): ?array
    {
        return Cache::flexible('sparkhire_jobs', [60, 120], function () {
            $response = $this->client->request('GET', '/partners/jobs');

            return $response ?? Cache::get('sparkhire_jobs');
        });
    }

    public function questionSets(): ?array
    {
        return Cache::flexible('sparkhire_questionSets', [60, 120], function () {
            $response = $this->client->request(
                'GET',
                '/partners/library/question_sets/all',
                ['type[]' => 'one_way']
            );

            return $response ?? Cache::get('sparkhire_questionSets');
        });
    }
}
