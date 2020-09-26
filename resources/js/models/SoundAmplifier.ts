export default class SoundAmplifier
{
    public id : number | null = null;
    public model : String | null = null;
    public type : String | null = null;
    public img_src : String | null = null;

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