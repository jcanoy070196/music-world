

import BrokerCore from './BrokerCore';
import SoundAmplifier from '../models/SoundAmplifier';

export default class SoundAmplifiersBroker{

    private _brokerCore : BrokerCore;

    constructor ()
    {
        this._brokerCore = new BrokerCore();
    }

    public async getSoundAmplifiers()
    {
        try {
            let response =   await this._brokerCore.apiGet('/api/sound-amplifiers');

            return response.data;
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async getSoundAmplifier(soundAmplifierId : Number)
    {
        try {
            let response =   await this._brokerCore.apiGet('/api/sound-amplifiers/' + soundAmplifierId);

            return response.data;
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async addSoundAmplifier(soundAmplifier : SoundAmplifier)
    {
        try {
            let response =   await this._brokerCore.apiPost('/api/sound-amplifiers',soundAmplifier.toArray());

            return response.data;
        }
        catch (exception) {

            alert("The given data was invalid.");
            throw (exception);
        }
    }

    public async updateSoundAmplifier(soundAmplifier : SoundAmplifier)
    {
        try {
            let response =   await this._brokerCore.apiPatch('/api/sound-amplifiers/' + soundAmplifier.id, soundAmplifier.toArray());

            return response.data;
        }
        catch (exception) {

            alert("The given data was invalid.");
            throw (exception);
        }
    }

    public async deleteSoundAmplifier(soundAmplifierId : Number)
    {
        try {
            let response =  await this._brokerCore.apiDelete('/api/sound-amplifiers/' + soundAmplifierId);

            return response.data;
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async searchSoundAmplifierImage(model : String)
    {
        var url = "https://app.zenserp.com/api/v2/search"; 

        var params = {
            apikey : '05cd8ce0-00a1-11eb-8756-e1b685a4aa59',
            q : model,
            device: "desktop",
        };

        url = url + "?tbm=isch",

        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

        try {
            return await this._brokerCore.apiGet(url);
        }
        catch (exception) {
            throw (exception);
        }
    }

}