import React, {useEffect, useState} from 'react';
import {Container, Typography, Box} from "@mui/material";
import PokemonCard from './pokemon-card.tsx'

export default function TeamContainer () {
    const [pokemonStatsData, setPokemonStatsData] = useState([]);
    const [ pokemonCardData, setPokemonCardData ] = useState([
        {
            id: 1,
            name: '',
            move1: null,
            move2: null,
            move3: null,
            move4: null,
        },
        {
            id: 2,
            name: '',
            move1: null,
            move2: null,
            move3: null,
            move4: null,
        },
        {
            id: 3,
            name: '',
            move1: null,
            move2: null,
            move3: null,
            move4: null,
        },
        {
            id: 4,
            name: '',
            move1: null,
            move2: null,
            move3: null,
            move4: null,
        },
        {
            id: 5,
            name: '',
            move1: null,
            move2: null,
            move3: null,
            move4: null,
        },
        {
            id: 6,
            name: '',
            move1: null,
            move2: null,
            move3: null,
            move4: null,
        }
    ])
    const [ moveData, setMoveData ] = useState([]);

    useEffect(() => {
        const handleFetchPokemonStatsData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/pokemon_stats');
                const data = await response.json();
                setPokemonStatsData(data);
            } catch (error) {
                console.error('Error fetching pokemon stats:', error);
            }
        }
        handleFetchPokemonStatsData();
    }, []);

    useEffect(() => {
        const handleFetchMoveData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/pokemon_moves');
                const data = await response.json();
                setMoveData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        handleFetchMoveData();
    }, []);

    const containerStyle = {
        backgroundColor: 'white',
        padding: '16px',
    }

    const centerTextStyles = {
        textAlign: 'center',
    };

    const cardStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
    }

    const handleUpdatePokemonCardName = (updatedName, updatedId) => {
        const newPokemonCardData = pokemonCardData.map((card) => {
            return card.id === updatedId ? {...card, name: updatedName} : card;
        })
        setPokemonCardData(newPokemonCardData);
    }

    return (
        <Container
            style={containerStyle}
            maxWidth='xl'>
            <Typography style={centerTextStyles}>
                Pokemon Team
            </Typography>
            <Box style={cardStyle}>
            {pokemonCardData.map((card, index) => (
                    <PokemonCard
                        pokemonStatsData={pokemonStatsData}
                        key={index}
                        cardId={index + 1}
                        pokemonCardData={pokemonCardData}
                        handleUpdatePokemonCardName={handleUpdatePokemonCardName}
                        moveData={moveData}
                    />
            ))}
                </Box>
        </Container>
    )
}