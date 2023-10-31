import React, {useContext, useEffect, useState} from 'react';
import '../index.css';
import { StatsTable} from "./pokemon-stats.tsx";
import { PokemonMoves, MovesContainer } from "./pokemon-moves.tsx";
import PokemonAbilities from "./pokemon-abilities.tsx";

export function TeamContainer() {

    return (
        <div className='team-container'>
            {[1, 2, 3, 4, 5, 6].map((index) => (
                <TeamSelector key={index} position={index} />
            ))}
        </div>
    )
}

export function TeamSelector({ position }) {
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestedPokemon, setSuggestedPokemon] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/pokemon_stats');
                if (!response) {
                    throw new Error('Response not okay');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filteredPokemon = data
            .filter((pokemon) => pokemon.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((pokemon) => pokemon.name)
        setSuggestedPokemon(filteredPokemon);
    }, [inputValue, data]);

   const handleInput = (e) => {
       const { value } = e.target;
       setInputValue(value);

       const selected = data.find((pokemon) => pokemon.name.toLowerCase() === value.toLowerCase())
       setSelectedPokemon(selected)
   }

    return (
        <div className='pokemon-selector'>
            <h2>Pokemon {position}</h2>
            <div className='pokemon-sprite'>
                {selectedPokemon && selectedPokemon.name ? (
                    <img
                    alt={inputValue.toLowerCase()}
                    src={`https://img.pokemondb.net/sprites/scarlet-violet/normal/${selectedPokemon.name.toLowerCase().replace(/ /g, '-')}.png`}
                />) : (
                    <div></div>
                )}
                <div className='details-container'>
                    <StatsTable data={selectedPokemon}/>
                    <div className='abilities-container'>
                        <PokemonAbilities selectedPokemon ={selectedPokemon}/>
                    </div>
                </div>
                <MovesContainer
                    selectedPokemon={selectedPokemon}
                />
            </div>
            <div className='text-box'>
                <input
                type='text'
                placeholder={`Enter pokemon ${position}`}
                list={`pokemonList${position}`}
                onChange={handleInput}
                />
            </div>
            <datalist id={`pokemonList${position}`}>
                {suggestedPokemon.map((pokemon, index) => (
                    <option key={index} value={pokemon} />
                ))}
            </datalist>
        </div>
    )
}