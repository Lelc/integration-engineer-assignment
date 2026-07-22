<?php

use App\Http\Controllers\Api\AssessmentController;
use App\Http\Controllers\Api\SparkHireController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('assessments', AssessmentController::class)->except('update');

Route::prefix('/sparkhire')->group(function () {
    Route::get('/jobs', [SparkHireController::class, 'jobs'])->name('sparkhire.jobs');
    Route::get('/question-sets', [SparkHireController::class, 'questionSets'])->name('sparkhire.question-sets');
});
