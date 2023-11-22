<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\TeacherPageController;
use Inertia\Inertia;

Route::name("teacher.")->group(function () {

    Route::get('/my-class-sections', [TeacherPageController::class, "myClassSections"])->name("my-classes-sections");
});
