import React, { createContext, useContext, useState } from "react";

const SelectedMovesContext = createContext();

export function useSelectedMoves() {
    return useContext(SelectedMovesContext);
}

export function SelectedMovesProvider({children}) {
    const [ selectedMoves, setSelectedMoves ] = useState([]);

    const addMove = (move) => {
        setSelectedMoves((prevMoves) => [...prevMoves, move]);
    }

    const removeMove = (move) => {
        setSelectedMoves((prevMoves) => prevMoves.filter((m) => m !== move));
    }

    return (
        <SelectedMovesContext.Provider value={{ selectedMoves, addMove, removeMove}}>
            {children}
        </SelectedMovesContext.Provider>
    )
}

