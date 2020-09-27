<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\SoundAmplifiersService;
use Exception;


class SoundAmplifiersController extends Controller
{
    public function getSoundAmplifiers(Request $request, SoundAmplifiersService $soundAmplifiersService)
    {
        try{
            $soundAmplifiers = $soundAmplifiersService->getSoundAmplifiers();

            $soundAmplifiersArray = [];

            foreach($soundAmplifiers as $soundAmplifier){
                $soundAmplifiersArray[] = $soundAmplifier->toArray();
            }

            return  $soundAmplifiersArray;

        }catch(Exception $ex)
        {   
            throw $ex;
        }
        
    }

    public function createSoundAmplifier(Request $request, SoundAmplifiersService $soundAmplifiersService)
    {
        try{

            $validatedData = $request->validate([
                'model' => 'required|max:255',
                'type' => 'required|max:255',
                'img_src' => 'required|max:255',
            ]);

            $soundAmplifier = $soundAmplifiersService->createSoundAmplifier($validatedData);

            return  $soundAmplifier->toArray();

        }catch(Exception $ex)
        {   
            throw $ex;
        }
        
    }

    public function getSoundAmplifier(Request $request, SoundAmplifiersService $soundAmplifiersService, $soundAmplifierId)
    {
        try{
            $soundAmplifier = $soundAmplifiersService->getSoundAmplifier($soundAmplifierId);

            return  $soundAmplifier->toArray();
            
        }catch(Exception $ex)
        {   
            throw $ex;
        }
    }

    public function updateSoundAmplifier(Request $request, SoundAmplifiersService $soundAmplifiersService, $soundAmplifierId)
    {
        try{
            $validatedData = $request->validate([
                'id' => 'required|integer',
                'model' => 'required|max:255',
                'type' => 'required|max:255',
                'img_src' => 'required|max:255',
            ]);

            $soundAmplifiersService->updateSoundAmplifier($soundAmplifierId, $validatedData);

            return  "Sound Amplifier Updated Successfully";
            
        }catch(Exception $ex)
        {   
            throw $ex;
        }
        
    }

    public function deleteSoundAmplifier(Request $request, SoundAmplifiersService $soundAmplifiersService,$soundAmplifierId)
    {
        try{
            $soundAmplifiersService->deleteSoundAmplifier($soundAmplifierId);

            return "Sound Amplifier Deleted Successfully";
            
        }catch(Exception $ex)
        {   
            throw $ex;
        }
    }
}
