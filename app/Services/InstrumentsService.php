<?php

namespace App\Services;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use App\Models\Instrument;

class InstrumentsService
{
    private $dbName = 'instruments';

    public function getInstruments() : Collection
    {
        $instrumentsCollection = DB::table($this->dbName)->get();

        $instruments = Instrument::hydrate($instrumentsCollection->toArray());

        return $instruments;
    }

    public function createInstrument($data = [])
    {
        DB::table($this->dbName)->insert(
            ['model' => $data['model'],'type' => $data['type'],'img_src' => $data['img_src']]
        );
    }

    public function getInstrument($instrumentId) 
    {
        $instrumentArray = DB::table($this->dbName)->where('id', $instrumentId)->first();

        $instrument = new Instrument($instrumentArray);

        return $instrument;
    }

    public function updateInstrument($instrumentId, $data = [])
    {
        $affected = DB::table($this->dbName)
              ->where('id', $instrumentId)
              ->update(['model' => $data['model'],'type' => $data['type'],'img_src' => $data['img_src']]);
    }

    public function deleteInstrument($instrumentId)
    {
        DB::table($this->dbName)->where('id', $instrumentId)->delete();
    }
}