package com.example.pokemon.pokemon.pokemonAbilities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/pokemon_abilities")
public class PokemonAbilitiesController {

    private final PokemonAbilitiesService pokemonAbilitiesService;

    @Autowired
    public PokemonAbilitiesController(PokemonAbilitiesService pokemonAbilitiesService) {
        this.pokemonAbilitiesService = pokemonAbilitiesService;
    }

    @GetMapping
    public List<PokemonAbilities> getPokemonAbilities() {
        return pokemonAbilitiesService.getPokemonAbilities();
    }
}
