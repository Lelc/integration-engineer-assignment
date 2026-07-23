<?php

namespace App\DTOs;

use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use WendellAdriel\ValidatedDTO\Casting\ArrayCast;
use WendellAdriel\ValidatedDTO\Casting\CarbonImmutableCast;
use WendellAdriel\ValidatedDTO\Casting\StringCast;
use WendellAdriel\ValidatedDTO\ValidatedDTO;

final class WebhookEventDTO extends ValidatedDTO
{
    public string $request_uuid;
    public string $event_type;
    public CarbonImmutable $event_time;
    public array $payload;
    public array $headers;

    public static function fromRequest(Request $request): self
    {
        return self::fromArray([
            'request_uuid' => $request->header('X-SparkHire-Request-UUID'),
            'event_type'   => $request->header('X-SparkHire-Event'),
            'event_time'   => $request->header('X-SparkHire-Event-Time'),
            'payload'      => $request->json()->all(),
            'headers'      => $request->headers->all(),
        ]);
    }

    protected function rules(): array
    {
        return [
            'request_uuid' => ['required', 'uuid'],
            'event_type' => ['required', 'string'],
            'event_time' => ['required', 'date'],
            'payload' => ['required', 'array'],
            'payload.uuid' => [
                Rule::requiredIf(
                    str_starts_with($this->dtoData['event_type'] ?? '', 'AssessmentItem')
                ),
                'uuid',
            ],
            'headers' => ['sometimes', 'array'],
        ];
    }

    protected function casts(): array
    {
        return [
            'request_uuid' => new StringCast(),
            'event_type' => new StringCast(),
            'event_time' => new CarbonImmutableCast(),
            'payload' => new ArrayCast(),
            'headers' => new ArrayCast(),
        ];
    }

    protected function defaults(): array
    {
        return [];
    }
}
