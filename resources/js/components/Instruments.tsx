import React from "react";
import InstrumentBroker from "../brokers/InstrumentsBroker";
import Instrument from "../models/Instrument";


export default class Instruments extends React.Component {
    
    state = {
      instruments : Array<Instrument>()
    }
  
    componentDidMount() {
        this.getInstruments();

    }

    async getInstruments()
    {
        let instrumentBroker = new InstrumentBroker();

        let data = await instrumentBroker.getInstruments();

        this.setState( {instruments : data });
    };
  
    render() {
      return (
            <div>
            
            <h1>
                Instruments
            </h1>

            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Model</th>
                    <th scope="col">Type</th>
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
                                <button type="button" className="btn btn-primary mr-1">Update</button>
                                <button type="button" className="btn btn-danger">Delete</button>
                            </div>
                        </td>
                    </tr>
                    
                })
            )}

                </tbody>
            </table>
            
            

        </div>
      )
    }
  }