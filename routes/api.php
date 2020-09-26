<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get ('instruments', 'API\InstrumentsController@getInstruments');
Route::post ('instruments', 'API\InstrumentsController@createInstrument');
Route::get ('instruments/{instrumentId}', 'API\InstrumentsController@getInstrument');
Route::patch ('instruments/{instrumentId}', 'API\InstrumentsController@updateInstrument');
Route::delete ('instruments/{instrumentId}', 'API\InstrumentsController@deleteInstrument');



Route::get ('sound-amplifiers', 'API\SoundAmplifiersController@getSoundAmplifiers');
Route::post ('sound-amplifiers', 'API\SoundAmplifiersController@createSoundAmplifier');
Route::get ('sound-amplifiers/{soundAmplifierId}', 'API\SoundAmplifiersController@getSoundAmplifier');
Route::patch ('sound-amplifiers/{soundAmplifierId}', 'API\SoundAmplifiersController@updateSoundAmplifier');
Route::delete ('sound-amplifiers/{soundAmplifierId}', 'API\SoundAmplifiersController@deleteSoundAmplifier');