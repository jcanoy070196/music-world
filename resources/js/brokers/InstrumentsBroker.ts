

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
            return await this._brokerCore.apiGet('/api/instruments');
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async getInstrument(instrumentId : Number)
    {
        try {
            return await this._brokerCore.apiGet('/api/instruments/' + instrumentId);
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async createInstrument(instrument : Instrument)
    {
        try {
            return await this._brokerCore.apiPost('/api/instruments',instrument.toArray());
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async updateInstrument(instrumentId : Number, instrument : Instrument)
    {
        try {
            return await this._brokerCore.apiPatch('/api/instruments/' + instrumentId, instrument.toArray());
        }
        catch (exception) {
            throw (exception);
        }
    }

    public async deleteInstrument(instrumentId : Number)
    {
        try {
            return await this._brokerCore.apiDelete('/api/instruments/' + instrumentId);
        }
        catch (exception) {
            throw (exception);
        }
    }

}