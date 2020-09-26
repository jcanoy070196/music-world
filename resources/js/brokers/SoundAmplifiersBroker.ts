

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
            return await this._brokerCore.apiGet('/api/sound-amplifiers');
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async getSoundAmplifier(soundAmplifierId : Number)
    {
        try {
            return await this._brokerCore.apiGet('/api/sound-amplifiers/' + soundAmplifierId);
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async createSoundAmplifier(soundAmplifier : SoundAmplifier)
    {
        try {
            return await this._brokerCore.apiPost('/api/sound-amplifiers',soundAmplifier.toArray());
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async updateSoundAmplifier(soundAmplifierId : Number, soundAmplifier : SoundAmplifier)
    {
        try {
            return await this._brokerCore.apiPatch('/api/sound-amplifiers/' + soundAmplifierId, soundAmplifier.toArray());
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async deleteSoundAmplifier(soundAmplifierId : Number)
    {
        try {
            return await this._brokerCore.apiDelete('/api/sound-amplifiers/' + soundAmplifierId);
        }
        catch (exception) {
            throw (exception);
        }
    }

}