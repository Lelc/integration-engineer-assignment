<?php

namespace App\Interfaces;

use App\DTOs\CreateAssessmentDTO;

interface SparkHireClientInterface
{
    public function jobs(): ?array;
    public function questionSets(): ?array;
    public function createAssessment(CreateAssessmentDTO $dto): ?array;
}
