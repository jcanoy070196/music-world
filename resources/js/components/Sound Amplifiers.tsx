import React from "react";
import SoundAmplifierBroker from "../brokers/SoundAmplifiersBroker";
import SoundAmplifier from "../models/SoundAmplifier";


export default class SoundAmplifiers extends React.Component {
    
    state = {
      soundAmplifiers : Array<SoundAmplifier>()
    }
  
    componentDidMount() {
        this.getSoundAmplifiers();

    }

    async getSoundAmplifiers()
    {
        let soundAmplifierBroker = new SoundAmplifierBroker();

        let data = await soundAmplifierBroker.getSoundAmplifiers();

        this.setState( {soundAmplifiers : data });
    };
  
    render() {
      return (
            <div>
            
            <h1>
                Sound Amplifiers
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