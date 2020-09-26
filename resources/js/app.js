

require('./bootstrap');


import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import Instruments from './components/Instruments';
import SoundAmplifiers from './components/Sound Amplifiers';

if(document.getElementById('home')){
    ReactDOM.render(
        <Home />,document.getElementById('home')
    )
}

if(document.getElementById('instruments')){
    ReactDOM.render(
        <Instruments />,document.getElementById('instruments')
    )
}

if(document.getElementById('sound-amplifiers')){
    ReactDOM.render(
        <SoundAmplifiers />,document.getElementById('sound-amplifiers')
    )
}




