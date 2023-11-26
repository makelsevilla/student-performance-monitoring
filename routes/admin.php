<?php

use Illuminate\Support\Facades\Route;

Route::name("admin.")->prefix("/admin")->middleware(["auth", "role:admin"])->group(function () {

    Route::get("/", function () {
        return redirect("/admin/users");
    });
    Route::resource("/users", \App\Http\Controllers\Admin\UserController::class);
});
