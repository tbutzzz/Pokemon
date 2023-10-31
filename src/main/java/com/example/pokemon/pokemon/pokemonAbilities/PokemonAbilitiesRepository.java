package com.example.pokemon.pokemon.pokemonAbilities;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PokemonAbilitiesRepository
        extends JpaRepository<PokemonAbilities, Long> {
}
