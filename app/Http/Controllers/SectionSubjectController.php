<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSectionSubjectRequest;
use App\Models\SectionSubject;
use Illuminate\Http\Request;
use Illuminate\Session\Store;

class SectionSubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreSectionSubjectRequest $request)
    {
        SectionSubject::create($request->validated());
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(SectionSubject $sectionSubject)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SectionSubject $sectionSubject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SectionSubject $sectionSubject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SectionSubject $sectionSubject)
    {
        $sectionSubject->delete();
        return back();
    }
}
