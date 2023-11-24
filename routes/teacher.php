<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\TeacherPageController;
use Inertia\Inertia;

Route::name("teacher.")->group(function () {

    Route::get('/dashboard', [TeacherPageController::class, "dashboard"])->name("dashboard");
    Route::get('/my-sections', [TeacherPageController::class, "mySections"])->name("my-sections");
    Route::get("/my-subjects", [TeacherPageController::class, "mySubjects"])->name("my-subjects");

    Route::resource("sections", \App\Http\Controllers\SectionController::class)->except(["create", "edit", "index"]);
    Route::resource("subjects", \App\Http\Controllers\SectionSubjectController::class)->except(["create", "edit", "index"])->parameter("subjects", "sectionSubject");
    Route::resource("students", \App\Http\Controllers\StudentController::class)->except(["create", "edit", "index"]);
    Route::resource("assessments", \App\Http\Controllers\AssessmentController::class)->except(["create", "edit", "index"]);
});
