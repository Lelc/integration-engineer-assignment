<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->string('type')->default('One-Way');
            $table->string('status');
            $table->string('candidate_name');
            $table->string('candidate_email');
            $table->string('candidate_avatar')->nullable();
            $table->string('job_uuid');
            $table->string('job_title');
            $table->dateTime('submitted_at')->nullable();
            $table->dateTime('deadline');
            $table->timestamps();
            $table->softDeletes();

            $table->index('status');
            $table->index('submitted_at');
            $table->index('deadline');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
