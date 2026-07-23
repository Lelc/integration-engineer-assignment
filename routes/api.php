<?php

use App\Http\Controllers\Api\AssessmentController;
use App\Http\Controllers\Api\SparkHireController;
use App\Http\Middleware\CheckSparkHireSignature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('assessments', AssessmentController::class)->except('update');

Route::prefix('/sparkhire')->group(function () {
    Route::get('/assessment-item/{uuid}', [SparkHireController::class, 'assessmentItem'])->name('sparkhire.assessment-item');
    Route::get('/jobs', [SparkHireController::class, 'jobs'])->name('sparkhire.jobs');
    Route::get('/question-sets', [SparkHireController::class, 'questionSets'])->name('sparkhire.question-sets');
});

Route::post('/webhooks/sparkhire', [SparkHireController::class, 'webhook'])
    ->middleware(CheckSparkHireSignature::class)
    ->name('sparkhire.webhook');
