import React, { useEffect, useState } from 'react';
import './index.css'
import { Banner, Bidoof } from './header.tsx';
import { TeamContainer, TeamSelector } from "./team-builder/team-builder-container.tsx";
import PokemonMoves from "./team-builder/pokemon-moves";

function App() {

    return (
        <div>
            {<Banner/>}
            {<Bidoof/>}
            {<TeamContainer />}
            {/*<Header />*/}
            {/*<Team data={pokemonData} />*/}
        </div>
    );
}

export default App;