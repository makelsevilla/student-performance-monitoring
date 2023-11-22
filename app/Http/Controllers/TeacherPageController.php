<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherPageController extends Controller
{
    public function myClassSections()
    {
        return Inertia::render('Teacher/MyClassSections');
    }
}
