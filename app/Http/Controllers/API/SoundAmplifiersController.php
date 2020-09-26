<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\SoundAmplifiersService;

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
            $soundAmplifiersService->createSoundAmplifier($request->body);

            return  "Sound Amplifier Created Successfully";

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
            $soundAmplifiersService->updateSoundAmplifier($soundAmplifierId, $request->body);

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
