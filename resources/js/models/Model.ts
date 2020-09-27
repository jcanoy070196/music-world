export default class Model
{
    protected readonly _setableAttributes : Object = {};


    public setAttribute(attributeName : string, value : any){
        if(this.hasOwnProperty(attributeName)) {
            this[attributeName] = value;
        }  
    }

    /**
     * If any of the attributes implement setAttributes function, it can be called, instead simple assigning input data to the variable
     * @param attributes
     * @param ignoreEmpty
     * @param recursiveSet
     */
    public setAttributes(attributes : any, ignoreEmpty : boolean = false, recursiveSet : boolean = false ) : void
    {

        let trueAttrName : string;

        for(let attr in attributes) {

            trueAttrName = attr;

            if(!this.hasOwnProperty(attr)) {             //property of the selected name does not exist
                if(!this.hasOwnProperty('_' + attr))     //try the same name with _, e.g.  data or _data
                    continue;
                trueAttrName = '_' + attr;
            }

            if(this._setableAttributes.hasOwnProperty(attr)) {

                if(recursiveSet && this[trueAttrName] && typeof this[trueAttrName].setAttributes === 'function') {
                    this[trueAttrName].setAttributes(attributes[attr]);
                }
                else if(this._setableAttributes[attr] === '') {
                    if(!ignoreEmpty || (ignoreEmpty && attributes[attr] !== null && attributes[attr] !== undefined)) {
                        this[trueAttrName] = attributes[attr];
                    }

                }
                else {
                    if(!ignoreEmpty || (ignoreEmpty && attributes[attr] !== null && attributes[attr] !== undefined)) {
                        this[this._setableAttributes[attr]] = attributes[attr];
                    }
                }
            }
        }
    }
}