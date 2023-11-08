import react, {useState} from 'react';
import {Button} from "@mui/material";
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import {AccessibleForward} from "@mui/icons-material";

export default function OptimizeMoves ({
                                           allSelectedMoves,
                                           moveData,
                                           availableMoves,
                                           selectedPokemon,
                                           pokemonStatValues,
                                           typeEffectivenessData,
                                           handleUpdateOptimizedMoves
}) {

    const types = [
        'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
        'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
    ];

    const superEffectiveData = typeEffectivenessData.reduce((result, typeInfo) => {
        result[typeInfo.type] = typeInfo.super_effective_against;
        return result;
    }, {})

    const modifyMovesPower = availableMoves.map((move) => {
        let basePower = move.base_power;
        if (move.name.toLowerCase() === 'rage fist') {
            basePower *= 2;
        }
        if (move.secondary_effect.toLowerCase().includes("increases damage by 100% if user is not holding an item")) {
            basePower *= 1.75;
        }
        if (move.secondary_effect.toLowerCase().includes("raises user's special attack one stage")
            || move.secondary_effect.toLowerCase().includes("switches out from battle")) {
            basePower *= 1.51;
        }
        if (move.secondary_effect.toLowerCase().includes('attacks the second turn')
            || move.secondary_effect.toLowerCase().includes('user cannot attack on the next turn')
            || move.secondary_effect.toLowerCase().includes('charges for the first turn')
            || move.secondary_effect.toLowerCase().includes("lowers user's special attack two stages")
            || move.secondary_effect.toLowerCase().includes("lowers user's physical attack two stages")
            || move.secondary_effect.toLowerCase().includes("if damaged between this, the user flinches")) {
            basePower /= 2;
        }
        if (move.name.toLowerCase() === 'body press'
            || move.secondary_effect.toLowerCase().includes("user receives 1/3rd of damage in re-coil")) {
            basePower /= 1.5;
        }

        return {
            ...move,
            base_power: basePower
        }
    })

    const handleOptimizeMovesClick = () => {

        const selectedType = pokemonStatValues.filter((pokemon) => pokemon.name.toLowerCase() === selectedPokemon.toLowerCase())
            .map((pokemon) => (pokemon.type2 !== null && pokemon.type2 !== 'NA' ? [pokemon.type1, pokemon.type2] : [pokemon.type1]))
            .flat();

        const attack = pokemonStatValues.filter((pokemon) => pokemon.name.toLowerCase() === selectedPokemon.toLowerCase())
            .map(pokemon => pokemon.attack);

        const special_attack = pokemonStatValues.filter((pokemon) => pokemon.name.toLowerCase() === selectedPokemon.toLowerCase())
            .map(pokemon => pokemon.special_attack);

        let bestStat = '';

        attack[0] > special_attack[0] ? bestStat = 'physical' : bestStat = 'special';

        const bestStabAttack = selectedType.map((type) => {
            const movesForStrongestStat = modifyMovesPower.filter(move => move.category === bestStat);
            const stabMoves = movesForStrongestStat
                .filter((move) => move.type === type && move.name !== null) // Filter out null values
                .sort((move1, move2) => move2.base_power - move1.base_power);
            if (stabMoves.length > 0) {
                return { name: stabMoves[0].name, type: stabMoves[0].type };
            }
            return null;
        });

        const remainingMoveSlots = 4 - bestStabAttack.length;

        const typesCoveredWithStab = bestStabAttack.map((move) => {
            return typeEffectivenessData.filter((typeObj) => typeObj.type === move.type)
                .map((typeObj) => typeObj.super_effective_against)
                .flat()
        });

        const uniqueTypesCoveredWithStab = Array.from(new Set(typesCoveredWithStab)).flat();

        const missingTypeCoverage = types.filter((type) => {
            return !uniqueTypesCoveredWithStab.includes(type);
        });

        const typesAvailableToSelectedPokemon =[...new Set(modifyMovesPower.filter(move => move.pokemon.toLowerCase() === selectedPokemon.toLowerCase()
            && move.category === bestStat
            && move.base_power > 0)
            .map(move => move.type))];

        console.log('typesAvailableToSelectedPokemon', typesAvailableToSelectedPokemon);

        // const nonStabTypes = types.filter((type) => {
        //     return !selectedType.includes(type);
        // })

        const filteredSuperEffectiveData = Object.keys(superEffectiveData)
            .filter((type) => typesAvailableToSelectedPokemon.includes(type))
            .reduce((filteredData, key) => {
                filteredData[key] = superEffectiveData[key];
                return filteredData
            }, []);

        for (const type in filteredSuperEffectiveData) {
            if (filteredSuperEffectiveData.hasOwnProperty(type)) {
                const superEffectiveArr = filteredSuperEffectiveData[type];
                const filteredArr = superEffectiveArr.filter(type => !uniqueTypesCoveredWithStab.includes(type));

                filteredSuperEffectiveData[type] = filteredArr;
            }
        }

        for (const type in filteredSuperEffectiveData) {
            if (filteredSuperEffectiveData.hasOwnProperty(type)) {
                const filteredArr = filteredSuperEffectiveData[type];
                filteredSuperEffectiveData[type] = filteredArr.length;
            }
        }

        const sortedCoverages = Object.entries(filteredSuperEffectiveData)
            .sort(([, a], [, b]) => b - a)
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});

        const top5Coverages = Object.entries(sortedCoverages).slice(0, 5);

        const top5CoveragesObject = Object.fromEntries(top5Coverages);

        console.log('top5CoveragesObject', top5CoveragesObject);

        const top5RemainingAttacks = Object.keys(top5CoveragesObject).map((type) => {
            const movesForStrongestStat = modifyMovesPower.filter(move => move.category === bestStat);
            const topMoves = movesForStrongestStat.filter((move) => move.type.toLowerCase() === type.toLowerCase());
            topMoves.sort((move1, move2) => move2.base_power - move1.base_power);

            if (topMoves.length > 0) {
                return {
                    name: topMoves[0].name,
                    type: topMoves[0].type,
                    typesCovered: top5CoveragesObject[type] as number,
                    base_power: topMoves[0].base_power,
                    accuracy: topMoves[0].accuracy
                };
            } else {

                return {
                    name: "No valid move found",
                    type: type,
                    typesCovered: 0,
                    base_power: 0,
                    accuracy: 0
                };
            }
        });

        const weightBestMoves = top5RemainingAttacks.map((move) => {
            const calcWeight = (move.typesCovered * move.base_power) + move.accuracy
            return {
                name: move.name,
                weight: calcWeight
            }
        });

        const optimizedNonStabMoves = weightBestMoves.sort((move1, move2) => move2.weight - move1.weight)
            .slice(0, remainingMoveSlots)
            .map(move => move.name);

        const bestStabMoveNames = bestStabAttack.map(move => move.name);

        const mergeOptimizedMoves = bestStabMoveNames.concat(optimizedNonStabMoves);

        handleUpdateOptimizedMoves(mergeOptimizedMoves);
    }



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
            onClick={handleOptimizeMovesClick}
        >Optimize Moves</Button>
    )
}