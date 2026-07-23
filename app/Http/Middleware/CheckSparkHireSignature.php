<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSparkHireSignature
{
    public function handle(Request $request, Closure $next): Response
    {
        $receivedSignature = $request->header('X-SparkHire-Signature');
        if (! $receivedSignature) {
            abort(Response::HTTP_UNAUTHORIZED, 'Missing signature header.');
        }

        $secret = config('services.sparkhire.webhook_secret');
        $secretSignature = hash_hmac('sha256', $request->getContent(), $secret);

        if (! hash_equals($secretSignature, $receivedSignature)) {
            abort(Response::HTTP_UNAUTHORIZED, 'Invalid signature header.');
        }

        return $next($request);
    }
}
