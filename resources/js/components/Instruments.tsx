import React from "react";
import InstrumentBroker from "../brokers/InstrumentsBroker";
import Instrument from "../models/Instrument";
import orderBy from 'lodash/orderBy';
import Image from "../models/Image";


let instrumentBroker = new InstrumentBroker();

export default class Instruments extends React.Component {

    state = {
      instruments : Array<Instrument>(),
      columnToSort : '',
      sortDirection : false,
      modalTitle : '',
      modalMode : '',
      tempInstrument : new Instrument(),
      instrumentIndex  : -1,
      imageResults : Array<Image>(),
    }
  
    componentDidMount() {
        this.getInstruments();
    }

    async searchInstrumentImage(model : String)
    {
        let data = await instrumentBroker.searchInstrumentImage(model);

        this.setState({
            imageResults : data.image_results
        })
    }

    async getInstruments()
    {
        let data = await instrumentBroker.getInstruments();

        this.setState( {instruments : data });
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
            instruments : orderBy(this.state.instruments, this.state.columnToSort, (this.state.sortDirection === true ? 'asc' : 'desc'))
        })
    }

    handleModal (mode : string, instrument : any, index : number){
        let newInstrument = new Instrument();

        newInstrument.setAttributes(instrument);

        switch(mode){
            case 'UPDATE' :  this.setState ( { modalMode : mode, modalTitle : 'Update Instrument', tempInstrument : newInstrument, instrumentIndex : index} ); break;
            case 'ADD' :  this.setState ( { modalMode : mode, modalTitle : 'Add Instrument' , tempInstrument : newInstrument, instrumentIndex : index} ); break;
            case 'DELETE' :  this.setState ( { modalMode : mode, modalTitle : 'Delete Instrument', tempInstrument : newInstrument, instrumentIndex : index} ); break
        }
    }

    updateTempValue (attribute : string, value : string){

        
        let updatedInstrument = this.state.tempInstrument;

        updatedInstrument.setAttribute(attribute,value);

        console.log(updatedInstrument);

        this.setState({ tempInstrument : updatedInstrument })
    }

    handleModalSubmit(instrument : Instrument, mode : string){
        switch(mode){
            case 'ADD' : this.addInstrument(instrument); break;
            case 'UPDATE' : this.updateInstrument(instrument); break;
            case 'DELETE' : this.deleteInstrument(instrument.id); break;
        }
        
        this.setState({
            imageResults : new Array<Image>(),
        })
    }

    async updateInstrument(instrument : Instrument){
        let data = await instrumentBroker.updateInstrument(instrument);

        let updatedInstruments = this.state.instruments;

        updatedInstruments[this.state.instrumentIndex] = instrument;

        this.setState({
            instruments : updatedInstruments
        });

        alert(data);

    }

    async addInstrument(instrument : Instrument){

        let data = await instrumentBroker.addInstrument(instrument);

        let newInstrument = new Instrument();

        newInstrument.setAttributes(data);

        let updatedInstruments = this.state.instruments;

        updatedInstruments.push(newInstrument);

        this.setState({
            instruments : updatedInstruments
        });

        alert("Instrument Added Successfully.");


        
    }

    async deleteInstrument(instrumentId : Number){
        let data = await instrumentBroker.deleteInstrument(instrumentId);

        let updatedInstruments = this.state.instruments;

        updatedInstruments.splice(this.state.instrumentIndex, 1);

        this.setState({
            instruments : updatedInstruments
        });

        alert(data);
    }
  
    render() {
      return (
            <div>
            
            <div className="col text-center">
                <h1>
                    Instruments
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

            {this.state.instruments.length === 0 ? (
                    <tr>
                        <td colSpan={5}>No Data Found</td>
                    </tr>

            ) : (

                this.state.instruments.map((instrument, index) => {
                    return <tr key={index}>
                        <th scope="row">{instrument.id}</th>
                        <td>{instrument.model}</td>
                        <td>{instrument.type}</td>
                        <td><img width="150 px" src={ "" + instrument.img_src} /></td>
                        <td>
                            <div className="col-md-12 text-center">
                                <button type="button" onClick={ () => this.handleModal('UPDATE', instrument, index)} className="btn btn-primary mr-1" data-toggle="modal" data-target="#instrumentModal">Update</button>
                                <button type="button" onClick={ () => this.handleModal('DELETE', instrument, index)} className="btn btn-danger" data-toggle="modal" data-target="#instrumentModal">Delete</button>
                            </div>
                        </td>
                    </tr>
                    
                })
            )}

                </tbody>
            </table>

            <button type="button" onClick={ () => this.handleModal('ADD', new Instrument(),-1)} className="btn btn-primary" data-toggle="modal" data-target="#instrumentModal">
                Add Instrument
            </button>

            <div className="modal fade" id="instrumentModal"  role="dialog" aria-labelledby="instrumentModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="instrumentModalLabel">{ this.state.modalTitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                            <div className="form-group">
                                <label>Model</label>
                                <input type="text" className="form-control" onChange={(event) => this.updateTempValue('model',event.target.value)} value={"" +this.state.tempInstrument.model}  placeholder="Enter Instrument Model"/>
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <input type="text" className="form-control"  onChange={(event) => this.updateTempValue('type',event.target.value)} value={"" +this.state.tempInstrument.type}placeholder="Enter Instrument Type"/>
                            </div>
                            <div className="form-group">
                                <label>Image Source</label>
                                <input disabled={true} type="text" className="form-control" onChange={(event) => this.updateTempValue('img_src',event.target.value)} value={"" +this.state.tempInstrument.img_src} placeholder="Autogenerated By Image Search"/>
                            </div>
                            <div className="col text-center">
                                <button onClick={ () => this.searchInstrumentImage(this.state.tempInstrument.model)} type="submit" className="btn btn-primary">Search Image by Model</button>
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
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.handleModalSubmit(this.state.tempInstrument, this.state.modalMode)}>{this.state.modalMode}</button>
                    </div>
                    </div>
                </div>
            </div>
            
            

        </div>
      )
    }
  }