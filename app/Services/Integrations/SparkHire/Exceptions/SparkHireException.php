<?php

namespace App\Services\Integrations\SparkHire\Exceptions;

use Exception;

class SparkHireException extends Exception
{
    public function __construct(
        string $message,
        private readonly ?int $statusCode = null,
        protected mixed $responseBody = null,
        ?\Throwable $previous = null,
    ) {
        parent::__construct(message: $message, previous: $previous);
    }

    public function statusCode(): ?int
    {
        return $this->statusCode;
    }

    public function responseBody(): mixed
    {
        return $this->responseBody;
    }
}
