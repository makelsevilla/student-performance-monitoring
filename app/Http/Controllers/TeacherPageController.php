<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherPageController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Teacher/Dashboard');
    }

    public function myClassSections()
    {
        return Inertia::render('Teacher/MyClassSections');
    }
}
