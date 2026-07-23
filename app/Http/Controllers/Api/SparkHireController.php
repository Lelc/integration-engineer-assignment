<?php

namespace App\Http\Controllers\Api;

use App\DTOs\WebhookEventDTO;
use App\Http\Controllers\Controller;
use App\Jobs\ProcessWebhookJob;
use App\Services\Integrations\SparkHire\SparkHireService;
use App\Services\WebhookService;
use Illuminate\Http\JsonResponse;

class SparkHireController extends Controller
{
    public function __construct(private readonly SparkHireService $service) {}

    public function jobs(): JsonResponse
    {
        $jobs = $this->service->jobs();

        return response()->json($jobs);
    }

    public function questionSets(): JsonResponse
    {
        $questionSets = $this->service->questionSets();

        return response()->json($questionSets);
    }

    public function webhook(WebhookEventDTO $dto, WebhookService $webhookService): JsonResponse
    {
        $event = $webhookService->store($dto);
        ProcessWebhookJob::dispatch($event->id);

        return response()->json();
    }
}
