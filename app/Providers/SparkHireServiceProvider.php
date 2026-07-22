<?php

namespace App\Providers;

use App\Interfaces\SparkHireServiceInterface;
use App\Services\Integrations\SparkHire\SparkHireService;
use Illuminate\Support\ServiceProvider;

class SparkHireServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(SparkHireServiceInterface::class, SparkHireService::class);
    }
}
