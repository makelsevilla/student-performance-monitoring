<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherPageController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Teacher/Dashboard');
    }

    public function mySections()
    {
        $user = auth()->user();
        $sections = $user->sections()->get();

        return Inertia::render("Teacher/MySections", [
            "sections" => $sections
        ]);
    }
}
