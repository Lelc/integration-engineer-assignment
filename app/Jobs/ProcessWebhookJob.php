<?php

namespace App\Jobs;

use App\Models\WebhookEvent;
use App\Services\WebhookService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessWebhookJob implements ShouldQueue
{
    use Queueable;

    public function __construct(public readonly int $webhookEventId) {}

    public function handle(WebhookService $service): void
    {
        $event = WebhookEvent::query()->find($this->webhookEventId);

        if ($event) {
            $service->process($event);
        }
    }
}
