
const axios = require('axios');

export default class BrokerCore
{

    constructor ()
    {
        
    }

    public async apiGet(url : String, params = {})
    {
        try {
            const response = await axios.get(url);

            return response;
            
        } catch (error) {
            throw error;
        }
    }

    public async apiPost(url : String, data = {})
    {
        try {
            const response = await axios.post(url, data);

            return response;
            
        } catch (error) {
            throw error;
        }
    }

    public async apiPatch(url : String, data = {})
    {
        try {
            const response = await axios.patch(url, data);

            return response;
        
        } catch (error) {
            throw error;
        }
    }

    public async apiDelete(url : String)
    {
        try {
            const response = await axios.delete(url);

            return response;
            
        } catch (error) {
            throw error;
        }
    }
}