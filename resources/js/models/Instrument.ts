import Model from './Model';

export default class Instrument extends Model
{
    public id : number = 0;
    public model : string  = '';
    public type : string  = '';
    public img_src : string  = '/favicon.ico';

    protected readonly _setableAttributes : Object = {
        'id' : '', 'model' : '', 'type' : '', 'img_src' : '', 

    };


    public toArray()
    {
        return {
            id : this.id,
            model : this.model,
            type : this.type,
            img_src : this.img_src,
        };
    }

    
}