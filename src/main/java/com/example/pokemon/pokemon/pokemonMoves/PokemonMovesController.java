package com.example.pokemon.pokemon.pokemonMoves;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/pokemon_moves")
public class PokemonMovesController {

    private final PokemonMovesService pokemonMovesService;

    @Autowired
    public PokemonMovesController(PokemonMovesService pokemonMovesService) {
        this.pokemonMovesService = pokemonMovesService;
    }

    @GetMapping
    public List<PokemonMoves> getPokemonMoves() {
        return pokemonMovesService.getPokemonMoves();
    }
}
