<?php

namespace App\Enums;

enum WebhookEventStatus: string
{
    case PENDING = 'pending';
    case HANDLED = 'handled';
    case FAILED = 'failed';
    case NOOP = 'noop';
}
