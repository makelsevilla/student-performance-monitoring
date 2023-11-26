<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get the user except the current user
        $users = User::get();

        return Inertia::render("Admin/Users", ["users" => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Admin/CreateEditUser");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => ["required", "string", "max:255"],
            "username" => ["required", "unique:users,username", "alpha_dash", "max:255"],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            "role" => ["required", "in:admin,teacher"]
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            "role" => $request->role,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route("admin.users.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {

        return Inertia::render("Admin/CreateEditUser", ["user" => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            "name" => ["required", "string", "max:255"],
            "username" => ["required", "unique:users,username," . $user->id, "alpha_dash", "max:255"],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            "role" => ["required", "in:admin,teacher"]
        ]);

        // check if the user is changing the password
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        $user->update($request->only(["name", "username", "role"]));

        return redirect()->route("admin.users.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->id === auth()->user()->id) {
            abort("You cannot delete your own account");
        }
        
        $user->delete();
        return back();
    }
}
