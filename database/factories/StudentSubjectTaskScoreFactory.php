<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentSubjectTaskScore>
 */
class StudentSubjectTaskScoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Get a random student and subject_quiz
        $student = \DB::table("students")->inRandomOrder()->first();
        $subjectTask = \DB::table("subject_tasks")->inRandomOrder()->first();

        return [
            'student_id' => $student->id,
            'subject_task_id' => $subjectTask->id,
            'score' => fake()->numberBetween(0, $subjectTask->total_score),
        ];
    }
}
