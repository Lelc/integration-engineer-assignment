<?php

namespace App\Http\Controllers\Api;

use App\DTOs\AssessmentIndexDTO;
use App\DTOs\CreateAssessmentDTO;
use App\Http\Controllers\Controller;
use App\Services\AssessmentService;
use Illuminate\Http\JsonResponse;

class AssessmentController extends Controller
{
    public function __construct(private readonly AssessmentService $service) {}

    public function index(AssessmentIndexDTO $dto): JsonResponse
    {
        $assessments = $this->service->index($dto);

        return response()->json($assessments);
    }

    public function show(string $assessmentUuid): JsonResponse
    {
        $assessment = $this->service->show($assessmentUuid);

        return response()->json($assessment);
    }

    public function store(CreateAssessmentDTO $dto): JsonResponse
    {
        $assessment = $this->service->store($dto);

        return response()->json($assessment);
    }

    public function destroy(string $assessmentUuid): JsonResponse
    {
        $assessment = $this->service->destroy($assessmentUuid);

        return response()->json($assessment);
    }
}
