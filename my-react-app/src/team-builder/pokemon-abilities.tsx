import React, {useEffect, useState} from 'react';
import '../index.css';

export default function PokemonAbilities ({ selectedPokemon }) {
    const [ abilityData, setAbilityData ] = useState([]);
    const [ currentAbilities, setCurrentAbilities ] = useState([]);

    useEffect(() => {
        const fetchAbilities = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/pokemon_abilities')
                if (!response) {
                    throw new Error('Error with response');
                }
                const data = await response.json()
                setAbilityData(data);
            } catch (error) {
                console.error('Error fetching abilities:', error)
            }
        }
        fetchAbilities();
    }, []);


    useEffect(() => {
        if (abilityData && selectedPokemon) {
            const filteredAbilities = abilityData.filter((ability) => {
                return ability.pokemon.toLowerCase() === selectedPokemon.name.toLowerCase();
            })
            setCurrentAbilities(filteredAbilities);
            console.log('filt ab:', filteredAbilities);
        }
    }, [selectedPokemon]);

    return (
        <React.Fragment>
            <div>
                {selectedPokemon ? (
                    <div>
                        <h3>Ability</h3>
                    <select>
                        <option disabled selected>
                            Select an ability
                        </option>
                        {currentAbilities.map((ability, index) => (
                            <option key={index} value={ability.ability}>
                                {ability.ability}
                            </option>
                        ))}
                    </select>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </React.Fragment>
    )
}