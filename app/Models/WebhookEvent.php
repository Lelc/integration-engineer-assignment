<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $request_uuid
 * @property string $event_type
 * @property string $event_time
 * @property array<array-key, mixed> $payload
 * @property array<array-key, mixed> $headers
 * @property string $status
 * @property string|null $last_error
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent whereEventTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent whereEventType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent whereHeaders($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent whereLastError($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent wherePayload($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent whereRequestUuid($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WebhookEvent whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class WebhookEvent extends Model
{
    protected $fillable = [
        'request_uuid',
        'event_type',
        'event_time',
        'payload',
        'headers',
        'status',
        'last_error',
    ];

    protected $casts = [
        'payload' => 'array',
        'headers' => 'array',
    ];
}
