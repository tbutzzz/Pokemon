import React, {useState} from 'react';
import {FormControl, MenuItem, Select, Typography} from "@mui/material";

const selectStyle = {
    height: 50,
};

export default function SortMoves ({ updateSelectedSortOption }) {

    const sortOptions = ['Alphabetical', 'Base Power', 'Physical', 'Special', 'Type'];

    const handleChange = (event) => {
        updateSelectedSortOption(event.target.value);
    }

return (
        <div  style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>Sort Moves</Typography>
            <FormControl sx={{ m: 1, width: 300, mt: 1 }}>
                <Select style={selectStyle} onChange={handleChange}>
                    {sortOptions.map((option, index) => (
                        <MenuItem
                        key={index}
                        value={option}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
)
}