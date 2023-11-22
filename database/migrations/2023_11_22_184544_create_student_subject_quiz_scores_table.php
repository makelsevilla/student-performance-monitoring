<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_subject_quiz_scores', function (Blueprint $table) {
            $table->foreignId("student_id")->constrained()->cascadeOnDelete();
            $table->foreignId("subject_quiz_id")->constrained("subject_quizzes")->cascadeOnDelete();
            $table->integer("score");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_subject_quiz_scores');
    }
};
