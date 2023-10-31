package com.example.pokemon.pokemon.pokemonAbilities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PokemonAbilitiesService {

    private final PokemonAbilitiesRepository pokemonAbilitiesRepository;

    @Autowired
    public PokemonAbilitiesService(PokemonAbilitiesRepository pokemonAbilitiesRepository) {
        this.pokemonAbilitiesRepository = pokemonAbilitiesRepository;
    }

    public List<PokemonAbilities> getPokemonAbilities() {
        return pokemonAbilitiesRepository.findAll();
    }

}