<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\InstrumentsService;
use Exception;


class InstrumentsController extends Controller
{
    public function getInstruments(Request $request, InstrumentsService $instrumentsService)
    {
        try{
            $instruments = $instrumentsService->getInstruments();

            $instrumentsArray = [];

            foreach($instruments as $instrument){
                $instrumentsArray[] = $instrument->toArray();
            }

            return  $instrumentsArray;

        }catch(Exception $ex)
        {   
            throw $ex;
        }
        
    }

    public function createInstrument(Request $request, InstrumentsService $instrumentsService)
    {
        try{
            $validatedData = $request->validate([
                'model' => 'required|max:255',
                'type' => 'required|max:255',
                'img_src' => 'required|max:255',
            ]);

            $instrument = $instrumentsService->createInstrument($validatedData);

            return  $instrument->toArray();

        }catch(Exception $ex)
        {   
            throw $ex;
        }
        
    }

    public function getInstrument(Request $request, InstrumentsService $instrumentsService, $instrumentId)
    {
        try{
            $instrument = $instrumentsService->getInstrument($instrumentId);

            return  $instrument->toArray();
            
        }catch(Exception $ex)
        {   
            throw $ex;
        }
    }

    public function updateInstrument(Request $request, InstrumentsService $instrumentsService, $instrumentId)
    {
        try{

            $validatedData = $request->validate([
                'id' => 'required|integer',
                'model' => 'required|max:255',
                'type' => 'required|max:255',
                'img_src' => 'required|max:255',
            ]);

            $instrumentsService->updateInstrument($instrumentId, $validatedData);

            return  "Instrument Updated Successfully";
            
        }catch(Exception $ex)
        {   
            throw $ex;
        }
        
    }

    public function deleteInstrument(Request $request, InstrumentsService $instrumentsService,$instrumentId)
    {
        try{

            $instrumentsService->deleteInstrument($instrumentId);

            return "Instrument Deleted Successfully";
            
        }catch(Exception $ex)
        {   
            throw $ex;
        }
    }
}
