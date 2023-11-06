import React, {useEffect, useRef, useState} from 'react';
import '../index.css'
import {
    Autocomplete,
    Card, Container,
    TextField,
    Typography
} from "@mui/material";
import PokemonStats from './pokemon-stats.tsx';
import PokemonMoves from "./pokemon-moves.tsx";
import PokemonAbilities from "./pokemon-abilities.tsx";
import TypeEffectiveness from "./type-effectiveness.tsx";
import SortMoves from "./sort-moves.tsx";
import OptimizeMoves from "./optimize-moves.tsx";

export default function PokemonCard ({ pokemonStatsData, key, cardId, pokemonCardData, handleUpdatePokemonCardName, moveData }) {
    const [availableMoves, setAvailableMoves] = useState([]);
    const [ allSelectedMoves, setAllSelectedMoves ] = useState([
        {
            id: 0,
            move: ''
        },
        {
            id: 1,
            move: ''
        },
        {
            id: 2,
            move: ''
        },
        {
            id: 3,
            move: ''
        }
    ]);
    const [ pokemonStatValues, setPokemonStatValues ] = useState([]);
    const [ pokemonAbilitiesData, setPokemonAbilitiesData ] = useState([]);
    const [ selectedPokemonAbilitiesData, setSelectedPokemonAbilitiesData ] = useState([]);
    const [ typeEffectivenessData, setTypeEffectivenessData ] = useState([]);
    const [ selectedSortOption, setSelectedSortOption ] = useState('');

    const containerStyle = {
        backgroundColor: 'gray',
        padding: '50px',
    }

    const imageStyle = {
        paddingBottom: '20px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    };


    const groupStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '50%', // Adjust the max width as needed
    };

    const pokemonNames = pokemonStatsData.map((pokemon) => pokemon.name);

    const handleNameChange = (cardId) => (event, newValue) => {
        handleUpdatePokemonCardName(newValue, cardId);
    }

    useEffect(() => {
        const fetchPokemonAbilitiesData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/pokemon_abilities');
                const data = await response.json();
                setPokemonAbilitiesData(data);
            } catch (error) {
                console.error('Error fetching pokemon abilities:', error);
            }
        }
        fetchPokemonAbilitiesData();
    }, []);

    useEffect(() => {
        const fetchTypeEffectivenessData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/pokemon_type_effectiveness');
                const data = await response.json();
                setTypeEffectivenessData(data);
            } catch (error) {
                console.error('Error fetching type effectiveness:', error)
            }
        }
        fetchTypeEffectivenessData();
    }, []);

    useEffect(() => {
        if (pokemonCardData[cardId - 1].name) {
            const filteredPokemonAbilities = pokemonAbilitiesData
                .filter(pokemon => pokemon.pokemon.toLowerCase() === pokemonCardData[cardId - 1].name.toLowerCase())
            setSelectedPokemonAbilitiesData(filteredPokemonAbilities)
        }
    }, [pokemonCardData]);

    useEffect(() => {
        if (pokemonCardData[cardId - 1].name) {
            const selectedPokemonMoves = moveData
                .filter(move => move.pokemon.toLowerCase() === pokemonCardData[cardId - 1].name.toLowerCase())
                .map(move =>( {
                    name: move.move,
                    type: move.type,
                    category: move.category,
                    power_points: move.power_points,
                    base_power: move.base_power,
                    accuracy: move.accuracy,
                    battle_effect: move.battle_effect,
                    secondary_effect: move.secondary_effect
                }));

            setAvailableMoves(selectedPokemonMoves);
        } else {
            setAvailableMoves([]);
        }
    }, [pokemonCardData, cardId, moveData]);

    useEffect(() => {
        if (pokemonCardData[cardId - 1].name) {
            const selectedPokemonStats = pokemonStatsData
                .filter(pokemon => pokemon.name.toLowerCase() === pokemonCardData[cardId - 1].name.toLowerCase())

            setPokemonStatValues(selectedPokemonStats);
        } else {
            setPokemonStatValues([]);
        }
    }, [pokemonCardData]);

    const handleUpdateMoves = (updatedMove, moveId) => {
        const newMoves = allSelectedMoves.map((move) => {
            return move.id === moveId ? {...move, move: updatedMove} : move;
        })
        setAllSelectedMoves(newMoves);
    }

    const updateSelectedSortOption = (updatedValue) => {
        setSelectedSortOption(updatedValue);
    }

    const autocompleteRef = useRef(null);

    return (
        <Card style={containerStyle}>
            <Typography>Pokemon {cardId}</Typography>
            <Container style={imageStyle}>
                <div style={groupStyle}>
                {pokemonCardData[cardId - 1].name ?
                    <img
                        alt={pokemonCardData[cardId - 1].name}
                        src={`https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemonCardData[cardId - 1].name.toLowerCase().replace(/ /g, '-')}.png`}
                    /> :
                    <div></div>
                }
                </div>
                <div style={groupStyle}>
                <Typography>Select Moves</Typography>
                {allSelectedMoves.map((move, index) => (
                    <PokemonMoves
                        moveId={index}
                        moveData={moveData}
                        availableMoves={availableMoves}
                        handleUpdateMoves={handleUpdateMoves}
                        selectedPokemon={pokemonCardData[cardId - 1].name}
                        autocompleteRef={autocompleteRef}
                        selectedSortOption={selectedSortOption}
                    />
                ))}
                <OptimizeMoves
                    allSelectedMoves={allSelectedMoves}
                    moveData={moveData}
                    availableMoves={availableMoves}
                    selectedPokemon={pokemonCardData[cardId - 1].name}
                    pokemonStatValues={pokemonStatValues}
                    typeEffectivenessData={typeEffectivenessData}
                />
                </div>
            </Container>
            <div>
                <div ref={autocompleteRef}>
            <Autocomplete
                renderInput={(params) => <TextField {...params} label={`Select Pokemon ${cardId}`} />}
                options={pokemonNames}
                value={pokemonCardData[cardId - 1].name || ''}
                placeholder={`Select Pokemon ${cardId}`}
                id={cardId}
                onChange={handleNameChange(cardId)}
            >
            </Autocomplete>
                </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                <Typography>Select Ability</Typography>
                <PokemonAbilities selectedPokemonAbilitiesData={selectedPokemonAbilitiesData} key={cardId - 1} autocompleteRef={autocompleteRef}/>
                </div>
                <div>
                <SortMoves updateSelectedSortOption={updateSelectedSortOption}></SortMoves>
                </div>
            </div>
            </div>
            <PokemonStats pokemonStatsData={pokemonStatsData} key={cardId - 1} pokemonStatValues={pokemonStatValues}/>
            <TypeEffectiveness  typeEffectivenessData={typeEffectivenessData} allSelectedMoves={allSelectedMoves} moveData={moveData}/>
        </Card>
    )
}