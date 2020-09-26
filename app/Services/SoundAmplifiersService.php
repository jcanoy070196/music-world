<?php

namespace App\Services;

use App\Http\Controllers\Controller;

class SoundAmplifiersService
{
    private $dbName = 'sound_amplifiers';
    
    public function getSoundAmplifiers() : Collection
    {
        $soundAmplifiersCollection = DB::table($this->dbName)->get();

        $soundAmplifiers = SoundAmplifier::hydrate($soundAmplifiersCollection->toArray());

        return $soundAmplifiers;
    }

    public function createSoundAmplifier($data = [])
    {
        DB::table($this->dbName)->insert(
            ['model' => $data['model'],'type' => $data['type'],'img_src' => $data['img_src']]
        );
    }

    public function getSoundAmplifier($soundAmplifierId) 
    {
        $soundAmplifierArray = DB::table($this->dbName)->where('id', $soundAmplifierId)->first();

        $soundAmplifier = new SoundAmplifier($soundAmplifierArray);

        return $soundAmplifier;
    }

    public function updateSoundAmplifier($soundAmplifierId, $data = [])
    {
        $affected = DB::table($this->dbName)
              ->where('id', $soundAmplifierId)
              ->update(['model' => $data['model'],'type' => $data['type'],'img_src' => $data['img_src']]);
    }

    public function deleteSoundAmplifier($soundAmplifierId)
    {
        DB::table($this->dbName)->where('id', $soundAmplifierId)->delete();
    }
}