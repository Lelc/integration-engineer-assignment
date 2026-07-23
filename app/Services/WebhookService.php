<?php

namespace App\Services;

use App\DTOs\WebhookEventDTO;
use App\Enums\WebhookEventStatus;
use App\Models\WebhookEvent;

readonly class WebhookService
{
    public function __construct(private AssessmentService $service) {}

    public function store(WebhookEventDTO $dto): WebhookEvent
    {
        return WebhookEvent::query()->create([
            'request_uuid' => $dto->request_uuid,
            'event_type' => $dto->event_type,
            'event_time' => $dto->event_time,
            'payload' => $dto->payload,
            'headers' => $dto->headers,
        ]);
    }

    public function process(WebhookEvent $event): void
    {
        $status = WebhookEventStatus::NOOP;

        if (str_starts_with($event->event_type, 'AssessmentItem')) {
            $uuid = $event->payload['uuid'];

            $handled = match ($event->event_type) {
                'AssessmentItem.Deleted' => $this->service->destroy($uuid),
                'AssessmentItem.Restored' => $this->service->restore($uuid),
                default => $this->service->createAssessmentFromPayload($event->payload),
            };

            $status = $handled ? WebhookEventStatus::HANDLED : WebhookEventStatus::FAILED;
        }

        $event->update(['status' => $status]);
    }
}
