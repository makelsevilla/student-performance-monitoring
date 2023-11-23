<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getTeachers()
    {
        $teachers = User::where('role', 'teacher')->select(["id", "name"])->get();
        return response()->json($teachers);
    }
}
