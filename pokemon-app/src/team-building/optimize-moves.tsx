import react from 'react';
import {Button} from "@mui/material";
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import {AccessibleForward} from "@mui/icons-material";

export default function OptimizeMoves ({ allSelectedMoves, moveData, availableMoves, selectedPokemon, pokemonStatValues, typeEffectivenessData }) {

    const types = [
        'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
        'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
    ];

    const weaknessesData = typeEffectivenessData.reduce((result, typeInfo) => {
        result[typeInfo.type] = typeInfo.weak_against;
        return result;
    }, {})

    console.log('weaknessesData', weaknessesData);

    const modifyMovesPower = availableMoves.map((move) => {
        let basePower = move.base_power;
        if (move.name.toLowerCase() === 'rage fist') {
            basePower *= 2;
        }
        if (move.secondary_effect.toLowerCase().includes('attacks the second turn')) {
            basePower /= 2;
        }

        return {
            ...move,
            base_power: basePower
        }
    })

    console.log('modifyMovesPower', modifyMovesPower);

    const selectedType = pokemonStatValues.filter((pokemon) => pokemon.name.toLowerCase() === selectedPokemon.toLowerCase())
        .map((pokemon) => (pokemon.type2 !== null && pokemon.type2 !== 'NA' ? [pokemon.type1, pokemon.type2] : [pokemon.type1]))
        .flat();

    const attack = pokemonStatValues.filter((pokemon) => pokemon.name.toLowerCase() === selectedPokemon.toLowerCase())
        .map(pokemon => pokemon.attack);

    const special_attack = pokemonStatValues.filter((pokemon) => pokemon.name.toLowerCase() === selectedPokemon.toLowerCase())
        .map(pokemon => pokemon.special_attack);

    let bestStat = '';

    attack > special_attack ? bestStat = 'attack' : bestStat = 'special_attack';

    console.log('selectedType', selectedType);

    const bestStabAttack = selectedType.map((type) => {
        console.log('in function: type', type);
        const stabMoves = modifyMovesPower.filter((move) => move.type === type);
        console.log('in function: stabMoves1', stabMoves);
        stabMoves.sort((move1, move2) => move2.base_power - move1.base_power);
        console.log('in function: stabMoves2', stabMoves);
        return {name: stabMoves[0].name, type: stabMoves[0]. type};
    });

    const remainingMoveSlots = 4  - bestStabAttack.length;

    const typesCoveredWithStab = bestStabAttack.map((move) => {
        return typeEffectivenessData.filter((typeObj) => typeObj.type === move.type)
            .map((typeObj) => typeObj.super_effective_against)
            .flat()
    });

    const uniqueTypesCoveredWithStab = Array.from(new Set(typesCoveredWithStab)).flat();

    const missingTypeCoverage = types.filter((type) => {
        return !uniqueTypesCoveredWithStab.includes(type);
    });

    const nonStabTypes = types.filter((type) => {
        return !selectedType.includes(type);
    })

    console.log('nonStabTypes', nonStabTypes);


    console.log('remainingMoveSlots', remainingMoveSlots);

    console.log('uniqueTypesCoveredWithStab', uniqueTypesCoveredWithStab);

    console.log('bestStabAttack', bestStabAttack);

    console.log('special_attack', special_attack);

    console.log('availableMoves', availableMoves);
    console.log('selectedPokemon', selectedPokemon);

    const containerStyle = {
        backgroundColor: 'grey',
        paddingTop: '15px',
        textColor: 'black',
        fontSize: 25,
        color: 'black',
    }

    const iconStyle = {
        fontSize: 30, // Adjust the icon size as needed
        marginRight: '2px', // Add some margin between the icon and text
    };

    return (
        <Button
            variant='contained'
            style={containerStyle}
            size='small'
            startIcon={<SportsMartialArtsIcon style={iconStyle}/>}
        >Optimize Moves</Button>
    )
}