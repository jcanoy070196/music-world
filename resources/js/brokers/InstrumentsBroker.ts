

import BrokerCore from './BrokerCore';
import Instrument from '../models/Instrument';



export default class InstrumentsBroker{

    private _brokerCore : BrokerCore;

    constructor ()
    {
        this._brokerCore = new BrokerCore();
    }

    public async getInstruments()
    {
        try {
            let response =  await this._brokerCore.apiGet('/api/instruments');

            return response.data;
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async getInstrument(instrumentId : Number)
    {
        try {
            let response =  await this._brokerCore.apiGet('/api/instruments/' + instrumentId);

            return response.data;
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async addInstrument(instrument : Instrument)
    {
        try {
            let response = await this._brokerCore.apiPost('/api/instruments',instrument.toArray());

            return response.data;
        }
        catch (exception) {
            
            alert("The given data was invalid.");

            throw (exception);
        }
    }

    public async updateInstrument(instrument : Instrument)
    {
        try {
            let response =  await this._brokerCore.apiPatch('/api/instruments/' + instrument.id, instrument.toArray());

            return response.data;
        }
        catch (exception) {
            alert("The given data was invalid.");

            throw (exception);
        }
    }

    public async deleteInstrument(instrumentId : Number)
    {
        try {
            let response =  await this._brokerCore.apiDelete('/api/instruments/' + instrumentId);

            return response.data;
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async searchInstrumentImage(model : String)
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
            let response =  await this._brokerCore.apiGet(url);

            return response.data;
        }
        catch (exception) {
            throw (exception);
        }
    }

}