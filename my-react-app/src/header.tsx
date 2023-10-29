import React from 'react';
import './index.css';

export function Banner() {
    return (
        <header className='header'>
            <h1>
                Pokemon Scarlet Team Builder
            </h1>
        </header>
    )
}

export function Bidoof() {
    const name = 'God Bidoof';
    const img = require('./images/godBidoof.jpg');

    return (
        <div>
            <img alt={name} src={img} className='bidoof-image' />
        </div>
    )
}


