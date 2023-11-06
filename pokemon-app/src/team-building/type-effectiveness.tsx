import React from 'react';
import {Container, Typography, Grid, Checkbox, Tooltip} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const types = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
];

export default function TypeEffectiveness({ typeEffectivenessData, allSelectedMoves, moveData }) {

    const selectedMoveTypes = allSelectedMoves.map((moveName) => {
        const move = moveData?.find(moveDataItem => moveDataItem.move === moveName.move);
        return move ? {move: moveName.move, type: move.type} : null
    })

    const isWeakAgainst = (type) => {
        const weakAgainstTypes = typeEffectivenessData.filter(typeEffective => typeEffective.type === type)
            .map(typeEffective => typeEffective.weak_against)
            .flat();
        const checkTypes = selectedMoveTypes.some(
            (selectedType) => selectedType !== null && weakAgainstTypes.includes(selectedType.type)
        )
        return !!checkTypes;
    }

    const returnSuperEffectiveMoves = (type) => {
        const weakAgainstTypes = typeEffectivenessData.filter(typeEffective => typeEffective.type === type)
            .map(typeEffective => typeEffective.weak_against)
            .flat();
        const selectedSuperEffectiveMoves = selectedMoveTypes.filter(move => move !== null && weakAgainstTypes.includes(move.type))
        return selectedSuperEffectiveMoves.map(move => move.move);
    }

    return (
        <Container>
            <Typography variant="h6">Type Coverage</Typography>
            <Grid container spacing={2}>
                {types.map((type) => (
                    <Grid item key={type}>
                        <Grid container direction="column" alignItems="center">
                            {isWeakAgainst(type) === true ? (
                                <Tooltip title={
                                    <ul>
                                        {returnSuperEffectiveMoves(type).map(move => (
                                            <li key={move}>{move}</li>
                                        ))}
                                    </ul>
                                }>
                                    <img
                                        alt={`${type} type`}
                                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${type}.png`}
                                        width="70px"
                                        height="auto"
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip title='No selected super effective moves'>
                                    <img
                                        alt={`${type} type`}
                                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${type}.png`}
                                        width="70px"
                                        height="auto"
                                    />
                                </Tooltip>
                            )}
                            {isWeakAgainst(type) ? (
                                <CheckCircleIcon color="success" />
                            ) : (
                                <HighlightOffIcon color="error" />
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}