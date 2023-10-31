import React, { useEffect, useState } from 'react';
import './index.css'
import { Banner, Bidoof } from './header.tsx';
import { TeamContainer, TeamSelector } from "./team-builder/team-builder-container.tsx";
import TypeCoverage from "./team-builder/type-coverage.tsx";
import PokemonMoves from "./team-builder/pokemon-moves";
import {SelectedMovesProvider} from "./team-builder/selected-moves-context.tsx";

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

        const darkSelector2 = document.querySelectorAll('.type-coverage-container');
        darkSelector2.forEach((selector) => {
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
    const [moveData, setMoveData] = useState([]);

    useEffect(() => {
        const fetchMoveData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/pokemon_moves');
                if (!response.ok) {
                    throw new Error('Error with response');
                }
                const data = await response.json();
                setMoveData(data);
            } catch (error) {
                console.error('Error fetching pokemon moves', error);
            }
        };
        fetchMoveData();
    }, []);

    return (
        <SelectedMovesProvider>
            <Banner />
            <Bidoof />
            <TeamContainer />
            <TypeCoverage moveData={moveData} />
            <DarkMode />
        </SelectedMovesProvider>
    );
}

export default App;