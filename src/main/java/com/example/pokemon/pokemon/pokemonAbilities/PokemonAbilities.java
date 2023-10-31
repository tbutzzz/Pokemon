package com.example.pokemon.pokemon.pokemonAbilities;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@Entity
@Table(name="pokemon_abilities")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PokemonAbilities {
    @Id
    @SequenceGenerator(
            name = "pokemon_sequence",
            sequenceName = "pokemon_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "pokemon_sequence"
    )
    private Long id;
    private String ability;
    private String pokemon;
    private String game_text;
    private String in_depth_effect;
    private String ability_url;

    public PokemonAbilities() {
    }

    public PokemonAbilities(Long id, String ability, String pokemon, String game_text, String in_depth_effect, String ability_url) {
        this.id = id;
        this.ability = ability;
        this.pokemon = pokemon;
        this.game_text = game_text;
        this.in_depth_effect = in_depth_effect;
        this.ability_url = ability_url;
    }

    public PokemonAbilities(String ability, String pokemon, String game_text, String in_depth_effect, String ability_url) {
        this.ability = ability;
        this.pokemon = pokemon;
        this.game_text = game_text;
        this.in_depth_effect = in_depth_effect;
        this.ability_url = ability_url;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAbility() {
        return ability;
    }

    public void setAbility(String ability) {
        this.ability = ability;
    }

    public String getPokemon() {
        return pokemon;
    }

    public void setPokemon(String pokemon) {
        this.pokemon = pokemon;
    }

    public String getGame_text() {
        return game_text;
    }

    public void setGame_text(String game_text) {
        this.game_text = game_text;
    }

    public String getIn_depth_effect() {
        return in_depth_effect;
    }

    public void setIn_depth_effect(String in_depth_effect) {
        this.in_depth_effect = in_depth_effect;
    }

    public String getAbility_url() {
        return ability_url;
    }

    public void setAbility_url(String ability_url) {
        this.ability_url = ability_url;
    }

    @Override
    public String toString() {
        return "PokemonAbilities{" +
                "id=" + id +
                ", ability='" + ability + '\'' +
                ", pokemon='" + pokemon + '\'' +
                ", game_text='" + game_text + '\'' +
                ", in_depth_effect='" + in_depth_effect + '\'' +
                ", ability_url='" + ability_url + '\'' +
                '}';
    }
}
