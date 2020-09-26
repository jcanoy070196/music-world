<?php

namespace App\Http\Controllers\WEB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PagesController extends Controller
{

    public function home (Request $request)
    {
        return view('pages.home');
    }

    public function instruments (Request $request)
    {
        return view('pages.instruments');
    }

    public function soundAmplifiers (Request $request)
    {
        return view('pages.sound amplifiers');
    }
}
