import React, { useEffect, useState, useMemo } from 'react';
import { useSelectedMoves } from './selected-moves-context.tsx'
import '../index.css';

export function MovesContainer({ selectedPokemon, moveData }) {
    return (
        <div className='moves-container'>
            {[1, 2, 3, 4].map((position) => (
                <PokemonMoves
                    selectedPokemon={selectedPokemon}
                    key={position}
                    position={position}
                />
            ))}
        </div>
    );
}

export function PokemonMoves({ selectedPokemon, position }) {
    const [moveData, setMoveData] = useState([]);
    const { addMove, removeMove } = useSelectedMoves();

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

    const moveOptions = useMemo(() => {
        if (!selectedPokemon || !selectedPokemon.name || moveData.length === 0) {
            return [];
        }

        const filteredMoves = moveData.filter(
            (move) => move.pokemon.toLowerCase() === selectedPokemon.name.toLowerCase()
        );


        return filteredMoves.map((move) => (
            move.move
        ));
    }, [selectedPokemon, moveData]);

    return (
        <div>
            {selectedPokemon ? (
                <div>
                    {moveOptions.length > 0 ? (
                        <div>
                            <h3>{`Move ${position}`}</h3>
                            <select
                            onChange={(e) => {
                                console.log('changing move', e.target.value);
                                const selectedMove = e.target.value;
                                selectedMove === 'disabled' ? removeMove(selectedMove) : addMove(selectedMove);
                            }}
                            >
                                <option disabled selected>
                                    Select a move
                                </option>
                                {moveOptions.map((move, index) => (
                                    <option key={index} value={move}>
                                        {move}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div>No moves available</div>
                    )}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}