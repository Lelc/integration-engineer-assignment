<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'assessments/assessment-list')->name('home');
Route::inertia('/create-assessment', 'assessments/create-assessment')->name('create-assessment');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
