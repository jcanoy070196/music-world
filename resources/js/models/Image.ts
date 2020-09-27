import Model from './Model';

export default class Image extends Model
{
    public position : number = 0;
    public sourceUrl : string  = '/favicon.ico';
    public thumbnail : string = '/favicon.ico';

    protected readonly _setableAttributes : Object = {
        'position' : '', 'sourceUrl' : '', 'thumbnail' : '', 

    };


    public toArray()
    {
        return {
            position : this.position,
            sourceUrl : this.sourceUrl,
        };
    }

    
}