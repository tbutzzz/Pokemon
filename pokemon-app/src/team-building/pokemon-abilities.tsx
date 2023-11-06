import React from 'react';
import {FormControl, MenuItem, Select, Tooltip} from "@mui/material";
import '../index.css';

const selectStyle = {
    height: 50,
};

export default function PokemonAbilities ({ selectedPokemonAbilitiesData, key, autocompleteRef }) {

    const handleClick = () => {
        if (selectedPokemonAbilitiesData.length === 0) {
            autocompleteRef.current.scrollIntoView({behavior: 'smooth'});
            autocompleteRef.current.style.backgroundColor = '#DC143C';
            autocompleteRef.current.style.transition = 'background-color 0.5s';
            autocompleteRef.current.classList.add('pulsate');

            setTimeout(() => {
                autocompleteRef.current.style.backgroundColor = 'inherit';
                autocompleteRef.current.classList.remove('pulsate');
            }, 2000)
        }
    }

    return (
            <div  style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControl sx={{ m: 1, width: 300, mt: 1 }}>
                    <Select style={selectStyle} onClick={handleClick}>
                        {selectedPokemonAbilitiesData.map((pokemon, index) => (
                            <MenuItem key={index} value={pokemon.ability}>
                                <Tooltip title={pokemon.game_text} arrow>
                                {pokemon.ability}
                                </Tooltip>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
    )
}