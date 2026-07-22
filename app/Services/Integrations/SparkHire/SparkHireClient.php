<?php

namespace App\Services\Integrations\SparkHire;

use App\Services\Integrations\SparkHire\Exceptions\SparkHireException;
use Cache;
use Http;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Log;

class SparkHireClient
{
    const string SPARKHIRE_ACCESS_TOKEN = 'sparkhire_access_token';

    /**
     * @throws SparkHireException
     */
    public function request(string $method, string $path, array $params = []): ?array
    {
        $response = $this->sendRequest($method, $path, $params);

        if ($response->status() === 401) {
            Cache::forget(self::SPARKHIRE_ACCESS_TOKEN);
            $response = $this->sendRequest($method, $path, $params);
        }

        if ($response->failed()) {
            Log::error('Spark Hire request failed', [
                'method' => $method,
                'path' => $path,
                'status' => $response->status(),
                'body' => $response->json() ?? $response->body(),
            ]);

            throw new SparkHireException(
                message: "Spark Hire request failed with status {$response->status()}",
                statusCode: $response->status(),
                responseBody: $response->json() ?? $response->body(),
            );
        }

        return $response->json();
    }

    private function sendRequest(string $method, string $path, array $params = [])
    {
        $http = $this->buildHttp();

        return $http->{$method}($path, $params);
    }

    private function getAccessToken(): string
    {
        return Cache::remember(self::SPARKHIRE_ACCESS_TOKEN, now()->addMinutes(225), function () {
            return $this->fetchNewAccessToken();
        });
    }

    /**
     * @throws SparkHireException
     * @throws ConnectionException
     */
    private function fetchNewAccessToken(): string
    {
        $response = Http::baseUrl(config('services.sparkhire.base_url'))
            ->post('/partners/oauth/token', [
                'grant_type' => 'client_credentials',
                'client_id' => config('services.sparkhire.client_id'),
                'client_secret' => config('services.sparkhire.client_secret'),
                'scope' => config('services.sparkhire.scope'),
            ]);

        if ($response->failed()) {
            Log::error('Spark Hire auth failed', [
                'status' => $response->status(),
                'body' => $response->json() ?? $response->body(),
            ]);

            throw new SparkHireException(
                message: "Spark Hire auth failed with status {$response->status()}",
                statusCode: $response->status(),
                responseBody: $response->json() ?? $response->body(),
            );
        }

        return $response->json('access_token');
    }

    protected function buildHttp(): PendingRequest
    {
        return Http::baseUrl(config('services.sparkhire.base_url'))
            ->withToken($this->getAccessToken())
            ->withHeaders([
                'requester' => config('services.sparkhire.requester_email'),
            ])
            ->acceptJson();
    }
}
