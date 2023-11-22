<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\SubjectQuiz;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentSubjectQuizScore>
 */
class StudentSubjectQuizScoreFactory extends Factory
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
        $subjectQuiz = \DB::table("subject_quizzes")->inRandomOrder()->first();

        return [
            'student_id' => $student->id,
            'subject_quiz_id' => $subjectQuiz->id,
            'score' => fake()->numberBetween(0, $subjectQuiz->total_score),
        ];
    }
}
