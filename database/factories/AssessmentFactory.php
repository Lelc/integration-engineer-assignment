<?php

namespace Database\Factories;

use App\Models\Assessment;
use Illuminate\Database\Eloquent\Factories\Factory;

class AssessmentFactory extends Factory
{
    protected $model = Assessment::class;

    public function definition(): array
    {
        return [
            'uuid' => $this->faker->uuid(),
            'type' => 'One-Way',
            'status' => 'pending',
            'candidate_name' => $this->faker->name(),
            'candidate_email' => $this->faker->safeEmail(),
            'candidate_avatar' => null,
            'job_uuid' => $this->faker->uuid(),
            'job_title' => $this->faker->jobTitle(),
            'submitted_at' => null,
            'deadline' => now()->addDays(7),
        ];
    }
}
