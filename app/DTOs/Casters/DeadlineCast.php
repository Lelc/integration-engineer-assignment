<?php

namespace App\DTOs\Casters;

use Carbon\CarbonImmutable;
use WendellAdriel\ValidatedDTO\Casting\Castable;

class DeadlineCast implements Castable
{
    public function cast(string $property, mixed $value): string
    {
        return CarbonImmutable::now()->addDays((int) $value)->format('Y-m-d\TH:i:sP');
    }
}
