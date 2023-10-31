package com.example.pokemon.pokemon.pokemonMoves;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PokemonMovesRepository
        extends JpaRepository<PokemonMoves, Long> {
}
