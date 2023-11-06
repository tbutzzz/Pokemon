import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export default function PokemonStats ({ pokemonStatsData, key, pokemonStatValues }) {

    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>Stat</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Type</TableCell>
                    </TableRow>
                </TableHead>
                    {pokemonStatValues.map((pokemon, index) => (
                        <TableBody>
                            <TableRow>
                                <TableCell key={index}>HP</TableCell>
                                <TableCell key={index}>{pokemon.hp}</TableCell>
                                <TableCell key={index}>{pokemon.type1}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell key={index}>Attack</TableCell>
                                <TableCell key={index}>{pokemon.attack}</TableCell>
                                <TableCell key={index}>{pokemon.type2}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell key={index}>Special Attack</TableCell>
                                <TableCell key={index}>{pokemon.special_attack}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell key={index}>Defense</TableCell>
                                <TableCell key={index}>{pokemon.defense}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell key={index}>Special Defense</TableCell>
                                <TableCell key={index}>{pokemon.special_defense}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell key={index}>Speed</TableCell>
                                <TableCell key={index}>{pokemon.speed}</TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
            </Table>
        </TableContainer>
    )
}