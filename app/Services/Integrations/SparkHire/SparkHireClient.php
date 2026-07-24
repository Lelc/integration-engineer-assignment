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
    const string SPARKHIRE_TOKEN_LOCK = 'sparkhire_token_lock';

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
        $token = Cache::get(self::SPARKHIRE_ACCESS_TOKEN);
        if ($token !== null) {
            return $token;
        }

        return Cache::lock( self::SPARKHIRE_TOKEN_LOCK , 10)->block(5, function () {
            $token = Cache::get(self::SPARKHIRE_ACCESS_TOKEN);
            if ($token !== null) {
                return $token;
            }

            $token = $this->fetchNewAccessToken();

            Cache::put(
                self::SPARKHIRE_ACCESS_TOKEN,
                $token,
                now()->addMinutes(225),
            );

            return $token;
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
