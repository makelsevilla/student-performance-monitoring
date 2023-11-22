<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\TeacherPageController;
use Inertia\Inertia;

Route::name("teacher.")->group(function () {

    Route::get('/dashboard', [TeacherPageController::class, "dashboard"])->name("dashboard");
    Route::get('/my-sections', [TeacherPageController::class, "mySections"])->name("my-sections");
});
