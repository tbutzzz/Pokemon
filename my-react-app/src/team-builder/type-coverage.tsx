import React, {useEffect, useState} from 'react';
import '../index.css';
import { SelectedMovesProvider, useSelectedMoves } from "./selected-moves-context.tsx";

export default function TypeCoverage ({ moveData }) {
    const { selectedMoves } = useSelectedMoves();

    const attackMoveData = moveData.filter(moveObj => moveObj.base_power > 0);

    const uniqueMoves = {};

    const matchedMoves = attackMoveData.filter(moveObj => {
        if (selectedMoves.includes(moveObj.move)) {
            if(!uniqueMoves[moveObj.move]) {
                uniqueMoves[moveObj.move] = true
                return true
            }
        }
        return false
    })

    const selectedMoveTypes = matchedMoves.map(moveObj => moveObj.type);

    console.log('attack move data', attackMoveData);

    console.log('selected moves', selectedMoves);

    console.log('Matched moves: ', matchedMoves);

    console.log('selectedMoveTypes: ', selectedMoveTypes);

    const typeEffectiveStructure = {
        bug: {
            strongAgainst: ['grass', 'dark', 'psychic'],
        },
        dark: {
            strongAgainst: ['ghost', 'psychic'],
        },
        dragon: {
            strongAgainst: ['dragon'],
        },
        electric: {
            strongAgainst: ['flying', 'water'],
        },
        fairy: {
            strongAgainst: ['fighting', 'dark', 'dragon'],
        },
        fighting: {
            strongAgainst: ['dark', 'ice', ' normal', 'rock', 'steel'],
        },
        fire: {
            strongAgainst: ['bug', 'grass', 'ice', 'steel'],
        },
        flying: {
            strongAgainst: ['bug', 'fighting', 'grass'],
        },
        ghost: {
            strongAgainst: ['ghost', 'psychic'],
        },
        grass: {
            strongAgainst: ['ground', 'rock', 'water'],
        },
        ground: {
            strongAgainst: ['electric', 'fire', 'poison', 'rock', 'steel'],
        },
        ice: {
            strongAgainst: ['dragon', 'flying', 'grass', 'ground'],
        },
        normal: {
            strongAgainst: [],
        },
        poison: {
            strongAgainst: ['fairy', 'grass'],
        },
        rock: {
            strongAgainst: ['bug', 'flying', 'fire', 'ice'],
        },
        steel: {
            strongAgainst: ['fairy', 'ice', 'rock'],
        },
        water: {
            strongAgainst: ['fire', 'ground', 'rock'],
        },
    }

    const checkTypeEffectiveness = (type) => {
        const strongAgainst = typeEffectiveStructure[type];
        return strongAgainst ? strongAgainst.strongAgainst : [];
    }

    const checkMultiTypeEffectiveness = (typeArr) => {
        const totalStrengths = typeArr.reduce((acc, type) => {
            const strengths = checkTypeEffectiveness(type);
            if (Array.isArray(strengths)) {
                return [...acc, ...strengths];
            }
            return acc;
        }, [])
        return totalStrengths;
    }


    console.log('multi type effect:', checkMultiTypeEffectiveness(['rock', 'dragon']));

   const checkTypeCovered = (type) => {
       const moveStrengths = checkMultiTypeEffectiveness(selectedMoveTypes);
       return moveStrengths.includes(type);
   }


    // const selectedMoveMapType = selectedMoves.map((move) =>{
    //     console.log(typeof(move));
    // })

    // console.log('type of move data.move:', (moveData.map((move) => console.log(typeof(move.move)))))


    const types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
        'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];

    return (
        <div className='type-coverage-container'>
            <div>
                <h2>Type Coverage</h2>
            </div>
            <div className='types-and-bonuses'>
                <div className='type-sprite-row'>
            {types.map((type) => (
                <img className='type-sprite'
                alt={`${type} type`}
                src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${type}.png`}
                title={type}
                />
            ))}
            </div>
            <div className='type-bonus-row'>
                {types.map((type) => (
                    <img className='green-checkbox'
                         alt='green checkbox'
                        src={checkTypeCovered(type) ? 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg' :
                    'https://static.vecteezy.com/system/resources/previews/020/841/019/non_2x/red-x-cross-x-transparent-background-free-png.png'}
                    />
                ))}
            </div>
            </div>
        </div>
    )
}