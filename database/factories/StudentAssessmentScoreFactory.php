<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentAssessmentScore>
 */
class StudentAssessmentScoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Get a random student and assessment
        $student = \DB::table("students")->inRandomOrder()->first();
        $assessment = \DB::table("assessments")->inRandomOrder()->first();

        return [
            'student_id' => $student->id,
            'assessment_id' => $assessment->id,
            'score' => fake()->numberBetween(0, $assessment->total),
        ];
    }
}
