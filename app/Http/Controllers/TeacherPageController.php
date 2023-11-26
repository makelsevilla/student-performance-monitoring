<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherPageController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();
        $sectionsCount = $user->sections()->count();
        $subjectsCount = $user->sectionSubjects()->count();

        return Inertia::render('Teacher/Dashboard', ["counts" => ["sections" => $sectionsCount, "subjects" => $subjectsCount]]);
    }

    public function mySections()
    {
        $user = auth()->user();
        $sections = $user->sections()->get();

        return Inertia::render("Teacher/MySections", [
            "sections" => $sections
        ]);
    }

    public function mySubjects()
    {
        $user = auth()->user();
        $subjects = $user->sectionSubjects()->with(["section"])->orderBy("name")->get();

        return Inertia::render("Teacher/MySubjects", [
            "subjects" => $subjects
        ]);
    }
}
