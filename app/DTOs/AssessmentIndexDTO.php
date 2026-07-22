<?php

namespace App\DTOs;

use WendellAdriel\ValidatedDTO\Casting\ArrayCast;
use WendellAdriel\ValidatedDTO\Casting\IntegerCast;
use WendellAdriel\ValidatedDTO\ValidatedDTO;

final class AssessmentIndexDTO extends ValidatedDTO
{
    public readonly int $page;
    public readonly int $per_page;
    public readonly array $order_by;

    protected function rules(): array
    {
        return [
            'page' => ['required', 'integer', 'min:1'],
            'per_page' => ['required', 'integer', 'min:10'],
            'order_by' => ['required', 'array'],
            'order_by.column' => ['required', 'string'],
            'order_by.direction' => ['required', 'string', 'in:asc,desc'],
        ];
    }

    protected function defaults(): array
    {
        return [
            'page' => 1,
            'per_page' => 10,
            'order_by' => ['column' => 'created_at', 'direction' => 'desc'],
        ];
    }

    protected function casts(): array
    {
        return [
            'page' => new IntegerCast(),
            'per_page' => new IntegerCast(),
            'order_by' => new ArrayCast(),
        ];
    }
}
