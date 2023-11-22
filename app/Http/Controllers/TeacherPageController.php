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

    public function mySections()
    {
        return Inertia::render('Teacher/MySections');
    }
}
