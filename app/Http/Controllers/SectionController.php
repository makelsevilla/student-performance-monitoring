<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSectionRequest;
use App\Models\Section;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSectionRequest $request)
    {
        \Auth::user()->sections()->create($request->validated());
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        $this->authorize("view", $section);
        
        return Inertia::render("Teacher/SectionDetails", [
            "section" => $section->load(["students", "sectionSubjects"])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Section $section)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Section $section)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        $this->authorize("delete", $section);
        // delete section
        $section->delete();
        return back();
    }
}
