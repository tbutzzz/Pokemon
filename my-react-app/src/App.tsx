import React, { useEffect, useState } from 'react';
import './index.css'

function Header() {
    return (
        <header style={{ textAlign: 'center' }}>
            <h1>Pokemon Scarlet Team Builder</h1>
        </header>
    )
}
interface DataItem {
    id: number;
    name: string;
    attack: number;
    hp: number;
    special_attack: number;
    speed: number;
    defense: number;
    special_defense: number;
    type1: string;
    type2?: string;
}

function Bidoof() {

    const name = 'God Bidoof';
    const img = require('./images/godBidoof.jpg')
    const style = {
        width: '400px',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
    }

    return (
        <div>
            <img alt={name} src={img} style={style} />
        </div>
    )
}

function PokemonBSTTable({ selectedPokemon }) {
    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/pokemon')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (!selectedPokemon || !data) {
        return null;
    }

    const selectedPokemonData = data.find((item) => item.name === selectedPokemon);

    if (!selectedPokemonData) {
        return null;
    }

    return (
        <div className='bst-table-container'>
            <img
                src={`https://img.pokemondb.net/sprites/scarlet-violet/normal/${selectedPokemon.toLowerCase().replace(/ /g, '-')}.png`}
                alt={selectedPokemon}
            />
            <table>
                <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>HP</td>
                    <td>{selectedPokemonData.hp}</td>
                    <td>Type 1</td>
                    <td>{selectedPokemonData.type1}</td>
                </tr>
                <tr>
                    <td>Attack</td>
                    <td>{selectedPokemonData.attack}</td>
                    <td>Type 2</td>
                    <td>{selectedPokemonData.type2 || 'N/A'}</td>
                </tr>
                <tr>
                    <td>Special Attack</td>
                    <td>{selectedPokemonData.special_attack}</td>
                </tr>
                <tr>
                    <td>Speed</td>
                    <td>{selectedPokemonData.speed}</td>
                </tr>
                <tr>
                    <td>Defense</td>
                    <td>{selectedPokemonData.defense}</td>
                </tr>
                <tr>
                    <td>Special Defense</td>
                    <td>{selectedPokemonData.special_defense}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

function AutoSuggestInput({ placeholder, onPokemonSelected, data }) {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isListVisible, setIsListVisible] = useState(false);

    const handleInputClick = (e) => {
        setIsListVisible(true);
    }

    useEffect(() => {
        if (inputValue.trim() === '') {
            setSuggestions([]);
        } else {
            const filteredSuggestions = data.filter((item) =>
                item.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        }
    }, [inputValue, data]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onPokemonSelected(e.target.value);
    };

    return (
        <div className='input-container'>
            <h2>{placeholder}:</h2>
            <input
                type='text'
                placeholder={`Enter ${placeholder}`}
                value={inputValue}
                onChange={handleInputChange}
                list={`${placeholder}Suggestions`}
                onClick={handleInputClick}
            />
            <datalist id={`${placeholder}Suggestions`}>
                {suggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion.name}/>
                ))}
            </datalist>
            <PokemonBSTTable selectedPokemon={inputValue} data={data} />
        </div>
    );
}

function Team({ data }) {
    const [selectedPokemon, setSelectedPokemon] = useState('');

    const handlePokemonSelected = (pokemon) => {
        setSelectedPokemon(pokemon);
    };

    return (
        <div className='border'>
            <h2 className='center'>Pokemon Team</h2>
            <AutoSuggestInput
                placeholder="Pokemon 1"
                onPokemonSelected={handlePokemonSelected}
                data={data} // Pass the data prop to AutoSuggestInput
            />
            <AutoSuggestInput
                placeholder="Pokemon 2"
                onPokemonSelected={handlePokemonSelected}
                data={data} // Pass the data prop to AutoSuggestInput
            />
            <AutoSuggestInput
                placeholder="Pokemon 3"
                onPokemonSelected={handlePokemonSelected}
                data={data} // Pass the data prop to AutoSuggestInput
            />
            <AutoSuggestInput
                placeholder="Pokemon 4"
                onPokemonSelected={handlePokemonSelected}
                data={data} // Pass the data prop to AutoSuggestInput
            />
            <AutoSuggestInput
                placeholder="Pokemon 5"
                onPokemonSelected={handlePokemonSelected}
                data={data} // Pass the data prop to AutoSuggestInput
            />
            <AutoSuggestInput
                placeholder="Pokemon 6"
                onPokemonSelected={handlePokemonSelected}
                data={data} // Pass the data prop to AutoSuggestInput
            />
        </div>
    );
}

function App() {
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/pokemon')
            .then((response) => response.json())
            .then((data) => {
                setPokemonData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <Header />
            <Bidoof />
            <Team data={pokemonData} />
        </div>
    );
}

export default App;