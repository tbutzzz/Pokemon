package com.example.pokemon.pokemon.pokemonMoves;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PokemonMovesService {

    private final PokemonMovesRepository pokemonMovesRepository;

    @Autowired
    public PokemonMovesService(PokemonMovesRepository pokemonMovesRepository) {
        this.pokemonMovesRepository = pokemonMovesRepository;
    }

    public List<PokemonMoves> getPokemonMoves() {
        return pokemonMovesRepository.findAll();
    }

}