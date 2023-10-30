import React, { useEffect, useState } from 'react';
import './index.css'
import { Banner, Bidoof } from './header.tsx';
import { TeamContainer, TeamSelector } from "./team-builder/team-builder-container.tsx";
import PokemonMoves from "./team-builder/pokemon-moves";

function DarkMode() {
    const [ isDarkMode, setIsDarkMode ] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        const body = document.body;
        body.classList.toggle('dark-mode');

        const darkSelectors = document.querySelectorAll('.pokemon-selector');
        darkSelectors.forEach((selector) => {
            selector.classList.toggle('dark-mode');
        })
    }

    return (
        <div className={`dark-mode-toggle ${isDarkMode ? 'dark' : 'light'}`}>
            <span className="light-label">Light</span>
            <label className="switch">
                <input type="checkbox" onClick={toggleDarkMode} />
                <span className="slider round"></span>
            </label>
            <span className="dark-label">Dark</span>
        </div>
    );
}

function App() {

    return (
        <div>
            {<Banner/>}
            {<Bidoof/>}
            {<TeamContainer />}
            {<DarkMode/>}
        </div>
    );
}

export default App;