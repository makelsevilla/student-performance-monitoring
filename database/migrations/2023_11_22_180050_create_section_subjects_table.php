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
        Schema::create('section_subjects', function (Blueprint $table) {
            $table->id();
            $table->foreignId("section_id")->constrained("sections")->cascadeOnDelete();
            $table->foreignId("teacher_id")->nullable()->constrained("users")->nullOnDelete();
            $table->string("name");
            $table->integer("quiz_weight")->default(0);
            $table->integer("task_weight")->default(0);
            $table->integer("exam_weight")->default(0);

            // unique constraint on section_id and name columns
            $table->unique(['section_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section_subjects');
    }
};
