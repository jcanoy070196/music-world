import React from "react";
import SoundAmplifierBroker from "../brokers/SoundAmplifiersBroker";
import SoundAmplifier from "../models/SoundAmplifier";
import orderBy from 'lodash/orderBy';
import Image from "../models/Image";


let soundAmplifierBroker = new SoundAmplifierBroker();

export default class SoundAmplifiers extends React.Component {

    state = {
      soundAmplifiers : Array<SoundAmplifier>(),
      columnToSort : '',
      sortDirection : false,
      modalTitle : '',
      modalMode : '',
      tempSoundAmplifier : new SoundAmplifier(),
      soundAmplifierIndex  : -1,
      imageResults : Array<Image>(),
    }
  
    componentDidMount() {
        this.getSoundAmplifiers();
    }

    async searchSoundAmplifierImage(model : String)
    {
        let data = await soundAmplifierBroker.searchSoundAmplifierImage(model);

        this.setState({
            imageResults : data.image_results
        })
    }

    async getSoundAmplifiers()
    {
        let data = await soundAmplifierBroker.getSoundAmplifiers();

        this.setState( {soundAmplifiers : data });
    };

    invertDirection (sortDirection : string){
        return sortDirection === 'asc' ? 'desc' : 'asc';
    }

    async handleSort (columnName : string) {
        await this.setState ( {
            columnToSort : columnName,
            sortDirection : this.state.columnToSort === columnName ? !this.state.sortDirection  : false,
        })

        await this.setState ({
            soundAmplifiers : orderBy(this.state.soundAmplifiers, this.state.columnToSort, (this.state.sortDirection === true ? 'asc' : 'desc'))
        })
    }

    handleModal (mode : string, soundAmplifier : any, index : number){
        let newSoundAmplifier = new SoundAmplifier();

        newSoundAmplifier.setAttributes(soundAmplifier);

        switch(mode){
            case 'UPDATE' :  this.setState ( { modalMode : mode, modalTitle : 'Update SoundAmplifier', tempSoundAmplifier : newSoundAmplifier, soundAmplifierIndex : index} ); break;
            case 'ADD' :  this.setState ( { modalMode : mode, modalTitle : 'Add SoundAmplifier' , tempSoundAmplifier : newSoundAmplifier, soundAmplifierIndex : index} ); break;
            case 'DELETE' :  this.setState ( { modalMode : mode, modalTitle : 'Delete SoundAmplifier', tempSoundAmplifier : newSoundAmplifier, soundAmplifierIndex : index} ); break
        }
    }

    updateTempValue (attribute : string, value : string){

        
        let updatedSoundAmplifier = this.state.tempSoundAmplifier;

        updatedSoundAmplifier.setAttribute(attribute,value);

        console.log(updatedSoundAmplifier);

        this.setState({ tempSoundAmplifier : updatedSoundAmplifier })
    }

    handleModalSubmit(soundAmplifier : SoundAmplifier, mode : string){
        switch(mode){
            case 'ADD' : this.addSoundAmplifier(soundAmplifier); break;
            case 'UPDATE' : this.updateSoundAmplifier(soundAmplifier); break;
            case 'DELETE' : this.deleteSoundAmplifier(soundAmplifier.id); break;
        }

        this.setState({
            imageResults : new Array<Image>(),
        })
    }

    async updateSoundAmplifier(soundAmplifier : SoundAmplifier){
        let data = await soundAmplifierBroker.updateSoundAmplifier(soundAmplifier);

        let updatedSoundAmplifiers = this.state.soundAmplifiers;

        updatedSoundAmplifiers[this.state.soundAmplifierIndex] = soundAmplifier;

        this.setState({
            soundAmplifiers : updatedSoundAmplifiers
        });

        alert(data);

    }

    async addSoundAmplifier(soundAmplifier : SoundAmplifier){

        let data = await soundAmplifierBroker.addSoundAmplifier(soundAmplifier);

        let newSoundAmplifier = new SoundAmplifier();

        newSoundAmplifier.setAttributes(data);

        let updatedSoundAmplifiers = this.state.soundAmplifiers;

        updatedSoundAmplifiers.push(newSoundAmplifier);

        this.setState({
            soundAmplifiers : updatedSoundAmplifiers
        });

        alert("SoundAmplifier Added Successfully.");


        
    }

    async deleteSoundAmplifier(soundAmplifierId : Number){
        let data = await soundAmplifierBroker.deleteSoundAmplifier(soundAmplifierId);

        let updatedSoundAmplifiers = this.state.soundAmplifiers;

        updatedSoundAmplifiers.splice(this.state.soundAmplifierIndex, 1);

        this.setState({
            soundAmplifiers : updatedSoundAmplifiers
        });

        alert(data);
    }
  
    render() {
      return (
            <div>
            
            <div className="col text-center">
                <h1>
                    SoundAmplifiers
                </h1>
                <br/>
            </div>
           

            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col"><div style={{cursor: "pointer"}} onClick={() => this.handleSort("id") }>ID</div></th>
                    <th scope="col"><div style={{cursor: "pointer"}} onClick={() => this.handleSort("model") }>Model</div></th>
                    <th scope="col"><div style={{cursor: "pointer"}} onClick={() => this.handleSort("type") }>Type</div></th>
                    <th scope="col">Image</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

            {this.state.soundAmplifiers.length === 0 ? (
                    <tr>
                        <td colSpan={5}>No Data Found</td>
                    </tr>

            ) : (

                this.state.soundAmplifiers.map((soundAmplifier, index) => {
                    return <tr key={index}>
                        <th scope="row">{soundAmplifier.id}</th>
                        <td>{soundAmplifier.model}</td>
                        <td>{soundAmplifier.type}</td>
                        <td><img width="150 px" src={ "" + soundAmplifier.img_src} /></td>
                        <td>
                            <div className="col-md-12 text-center">
                                <button type="button" onClick={ () => this.handleModal('UPDATE', soundAmplifier, index)} className="btn btn-primary mr-1" data-toggle="modal" data-target="#soundAmplifierModal">Update</button>
                                <button type="button" onClick={ () => this.handleModal('DELETE', soundAmplifier, index)} className="btn btn-danger" data-toggle="modal" data-target="#soundAmplifierModal">Delete</button>
                            </div>
                        </td>
                    </tr>
                    
                })
            )}

                </tbody>
            </table>

            <button type="button" onClick={ () => this.handleModal('ADD', new SoundAmplifier(),-1)} className="btn btn-primary" data-toggle="modal" data-target="#soundAmplifierModal">
                Add SoundAmplifier
            </button>

            <div className="modal fade" id="soundAmplifierModal"  role="dialog" aria-labelledby="soundAmplifierModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="soundAmplifierModalLabel">{ this.state.modalTitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                            <div className="form-group">
                                <label>Model</label>
                                <input type="text" className="form-control" onChange={(event) => this.updateTempValue('model',event.target.value)} value={"" +this.state.tempSoundAmplifier.model}  placeholder="Enter SoundAmplifier Model"/>
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <input type="text" className="form-control"  onChange={(event) => this.updateTempValue('type',event.target.value)} value={"" +this.state.tempSoundAmplifier.type}placeholder="Enter SoundAmplifier Type"/>
                            </div>
                            <div className="form-group">
                                <label>Image Source</label>
                                <input disabled={true} type="text" className="form-control" onChange={(event) => this.updateTempValue('img_src',event.target.value)} value={"" +this.state.tempSoundAmplifier.img_src} placeholder="Autogenerated By Image Search"/>
                            </div>
                            <div className="col text-center">
                                <button onClick={ () => this.searchSoundAmplifierImage(this.state.tempSoundAmplifier.model)} type="submit" className="btn btn-primary">Search Image by Model</button>
                            </div>

                            
                            <br></br>
                            <div className="container overflow-auto" style={{maxHeight : "500px"}}>

                                <hr className="mt-2 mb-5"/>

                                <div className="row text-center text-lg-left">


                                {this.state.imageResults.length === 0 ? (

                                    <div className="col text-center">
                                        <h3>Try Searching for Image</h3>
                                    </div>

                                    ) : (

                                        this.state.imageResults.map((image, index) => {
                                            return <div className="col-lg-3 col-md-4 col-6" key={index}>
                                                        <a onClick={ () => this.updateTempValue('img_src',image.sourceUrl)} className="d-block mb-4 h-100">
                                                            <img className="img-fluid img-thumbnail" src={"" + image.thumbnail } alt="" />
                                                        </a>
                                                    </div>
                                            
                                        })
                                    )}
                                </div>

                            </div>
                            
                        </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">CLOSE</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.handleModalSubmit(this.state.tempSoundAmplifier, this.state.modalMode)}>{this.state.modalMode}</button>
                    </div>
                    </div>
                </div>
            </div>
            
            

        </div>
      )
    }
  }