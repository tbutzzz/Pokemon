import React, {useEffect, useState} from 'react';
import '../index.css'
import {
    CircularProgress,
    FormControl,
    ListItemIcon,
    MenuItem,
    Select,
    styled,
    Tooltip,
    Typography
} from "@mui/material";

const selectStyle = {
    height: 50,
};

export default function PokemonMoves ({ moveId, moveData, availableMoves, handleUpdateMoves, selectedPokemon, autocompleteRef, selectedSortOption }) {
    const [selectedMove, setSelectedMove] = useState(null);
    const [ sortedMoves, setSortedMoves ] = useState(availableMoves);
    const [ loading, setLoading ] = useState(false);

    const handleMoveSelection = (moveId) => (event) => {
        setSelectedMove(event.target.value);
        handleUpdateMoves(event.target.value, moveId);
    };

    const handleOnClick = () => {
        if (availableMoves.length === 0) {
            autocompleteRef.current.scrollIntoView({ behavior: 'smooth' });
            autocompleteRef.current.style.backgroundColor = '#DC143C';
            autocompleteRef.current.style.transition = 'background-color 0.5s';
            autocompleteRef.current.classList.add('pulsate');

            setTimeout(() => {
                autocompleteRef.current.style.backgroundColor = 'inherit';
                autocompleteRef.current.classList.remove('pulsate');
            }, 2000)
        }
    }

    useEffect(() => {
        setLoading(true);
        let ignore = false;
        let filteredMoves = [];

        const loadingTimeout = setTimeout(() => {
            if (!ignore) {
                switch (selectedSortOption) {
                    case 'Base Power':
                        filteredMoves = availableMoves.sort((move1, move2) => move2.base_power - move1.base_power);
                        break;

                    case 'Physical':
                        const physicalMoves = availableMoves.filter((move) => move.category === 'physical');
                        const otherNonPhysMoves = availableMoves.filter((move) => move.category !== 'physical');

                        const sortedPhysicalMoves = physicalMoves.sort((move1, move2) => move2.base_power - move1.base_power);
                        filteredMoves = [...sortedPhysicalMoves, ...otherNonPhysMoves];
                        break;

                    case 'Special':
                        const specialMoves = availableMoves.filter((move) => move.category === 'special');
                        const otherNonSpecialMoves = availableMoves.filter((move) => move.category !== 'special');

                        const sortedSpecialMoves = specialMoves.sort((move1, move2) => move2.base_power - move1.base_power);
                        filteredMoves = [...sortedSpecialMoves, ...otherNonSpecialMoves];
                        break;

                    case 'Type':
                        filteredMoves = availableMoves.sort((move1, move2) => move1.type.localeCompare(move2.type));
                        break;

                    case 'Alphabetical':
                        filteredMoves = availableMoves.sort((move1, move2) => move1.name.localeCompare(move2.name));
                        break;

                    default:
                        filteredMoves = availableMoves;
                }
                setSortedMoves(filteredMoves);
                setLoading(false);
            } else {
                setSortedMoves(availableMoves);
                setLoading(false);
            }

            return () => {
                clearTimeout(loadingTimeout);
                ignore = true;
            };
        }, 500); // Adjust this timeout value as needed.

        return () => {
            clearTimeout(loadingTimeout);
        };
    }, [selectedSortOption]);

    useEffect(() => {
        console.log('loading', loading)
        console.log('selectedSortOption', selectedSortOption);
    }, [loading, selectedSortOption]);

    return (
        <div>
            <div  style={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl sx={{ m: 1, width: 300, mt: 1 }}>
            <Select
                style={selectStyle}
                value={selectedMove || ''}
                key={moveId}
                onChange={handleMoveSelection(moveId)}
                onClick={handleOnClick}
                disabled={loading}
            >
                {loading ? (
                    <MenuItem disabled>
                        <CircularProgress size={20} thickness={5} /> Loading moves...
                    </MenuItem>
                ) : (sortedMoves.length !== 0 ? sortedMoves.map((move) => (
                    // <Tooltip title={(
                    //     <ul>
                    //         <li>Name: {move.name}</li>
                    //         <li>Type: {move.type}</li>
                    //         <li>Base Power: {move.base_power}</li>
                    //         <li>Power Points: {move.power_points}</li>
                    //         <li>Category: {move.category}</li>
                    //         <li>Effect: {move.battle_effect}</li>
                    //     </ul>
                    // )}
                    //          placement="right-start"
                    // >
                    <MenuItem
                        key={move.name}
                        value={move.name}
                        //onClick={handleMoveSelection(moveId, move.name)}
                        //style={getStyles(name, personName, theme)}
                    >
                        {move.name}
                        {/*<ListItemIcon>*/}
                        {/*    <img*/}
                        {/*        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${move.type}.png`}*/}
                        {/*        alt={move.type}*/}
                        {/*        style={{ width: 'auto', height: '30px', marginLeft: '8px' }}*/}
                        {/*    />*/}
                        {/*    {move.category === 'physical' ? ( <img*/}
                        {/*        src={`https://archives.bulbagarden.net/media/upload/a/a4/Physical_icon_HOME.png`}*/}
                        {/*        alt='physical'*/}
                        {/*        style={{ width: 'auto', height: '30px', marginLeft: '8px' }}*/}
                        {/*    />) : move.category === 'special' ? (*/}
                        {/*        <img*/}
                        {/*            src={`https://archives.bulbagarden.net/media/upload/c/c4/Special_icon_HOME.png`}*/}
                        {/*            alt='special'*/}
                        {/*            style={{ width: 'auto', height: '30px', marginLeft: '8px' }}*/}
                        {/*        />*/}
                        {/*    ) : move.category === 'other' ? (*/}
                        {/*        <img*/}
                        {/*            src={`https://archives.bulbagarden.net/media/upload/3/34/Status_icon_HOME.png`}*/}
                        {/*            alt='status'*/}
                        {/*            style={{ width: 'auto', height: '30px', marginLeft: '8px' }}*/}
                        {/*        />*/}
                        {/*    ) : (*/}
                        {/*        <img />*/}
                        {/*    ) }*/}
                        {/*</ListItemIcon>*/}
                    </MenuItem>
                    // </Tooltip>
                )) : availableMoves.map((move) => (
                    <MenuItem
                        key={move.name}
                        value={move.name}
                        //onClick={handleMoveSelection(moveId, move.name)}
                        //style={getStyles(name, personName, theme)}
                    >
                        {move.name}
                    </MenuItem>
                )))}
            </Select>
        </FormControl>
            </div>
        </div>
    )
}