package com.example.pokemon.pokemon;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PokemonRepository
        extends JpaRepository<Pokemon, Long> {
}
