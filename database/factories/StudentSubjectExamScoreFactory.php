<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentSubjectExamScore>
 */
class StudentSubjectExamScoreFactory extends Factory
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
        $subjectExam = \DB::table("subject_exams")->inRandomOrder()->first();

        return [
            'student_id' => $student->id,
            'subject_quiz_id' => $subjectExam->id,
            'score' => fake()->numberBetween(0, $subjectExam->total_score),
        ];
    }
}
