package com.example.pokemon.pokemon.pokemonMoves;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@Entity
@Table(name="pokemon_moves")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PokemonMoves {
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
    private String move;
    private String type;
    private String category;
    private Integer power_points;
    private Integer base_power;
    private Integer accuracy;
    private String battle_effect;
    private String secondary_effect;
    private Float secondary_rate;
    private Float critical_rate;
    private Integer speed_priority;
    private String attack_url;
    private String pokemon;

    public PokemonMoves() {
    }

    public PokemonMoves(Long id, String move, String type, String category, Integer power_points, Integer base_power, Integer accuracy, String battle_effect, String secondary_effect, Float secondary_rate, Float critical_rate, Integer speed_priority, String attack_url, String pokemon) {
        this.id = id;
        this.move = move;
        this.type = type;
        this.category = category;
        this.power_points = power_points;
        this.base_power = base_power;
        this.accuracy = accuracy;
        this.battle_effect = battle_effect;
        this.secondary_effect = secondary_effect;
        this.secondary_rate = secondary_rate;
        this.critical_rate = critical_rate;
        this.speed_priority = speed_priority;
        this.attack_url = attack_url;
        this.pokemon = pokemon;
    }

    public PokemonMoves(String move, String type, String category, Integer power_points, Integer base_power, Integer accuracy, String battle_effect, String secondary_effect, Float secondary_rate, Float critical_rate, Integer speed_priority, String attack_url, String pokemon) {
        this.move = move;
        this.type = type;
        this.category = category;
        this.power_points = power_points;
        this.base_power = base_power;
        this.accuracy = accuracy;
        this.battle_effect = battle_effect;
        this.secondary_effect = secondary_effect;
        this.secondary_rate = secondary_rate;
        this.critical_rate = critical_rate;
        this.speed_priority = speed_priority;
        this.attack_url = attack_url;
        this.pokemon = pokemon;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMove() {
        return move;
    }

    public void setMove(String move) {
        this.move = move;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getPower_points() {
        return power_points;
    }

    public void setPower_points(Integer power_points) {
        this.power_points = power_points;
    }

    public Integer getBase_power() {
        return base_power;
    }

    public void setBase_power(Integer base_power) {
        this.base_power = base_power;
    }

    public Integer getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(Integer accuracy) {
        this.accuracy = accuracy;
    }

    public String getBattle_effect() {
        return battle_effect;
    }

    public void setBattle_effect(String battle_effect) {
        this.battle_effect = battle_effect;
    }

    public String getSecondary_effect() {
        return secondary_effect;
    }

    public void setSecondary_effect(String secondary_effect) {
        this.secondary_effect = secondary_effect;
    }

    public Float getSecondary_rate() {
        return secondary_rate;
    }

    public void setSecondary_rate(Float secondary_rate) {
        this.secondary_rate = secondary_rate;
    }

    public Float getCritical_rate() {
        return critical_rate;
    }

    public void setCritical_rate(Float critical_rate) {
        this.critical_rate = critical_rate;
    }

    public Integer getSpeed_priority() {
        return speed_priority;
    }

    public void setSpeed_priority(Integer speed_priority) {
        this.speed_priority = speed_priority;
    }

    public String getAttack_url() {
        return attack_url;
    }

    public void setAttack_url(String attack_url) {
        this.attack_url = attack_url;
    }

    public String getPokemon() {
        return pokemon;
    }

    public void setPokemon(String pokemon) {
        this.pokemon = pokemon;
    }

    @Override
    public String toString() {
        return "PokemonMoves{" +
                "id=" + id +
                ", move='" + move + '\'' +
                ", type='" + type + '\'' +
                ", category='" + category + '\'' +
                ", power_points=" + power_points +
                ", base_power=" + base_power +
                ", accuracy=" + accuracy +
                ", battle_effect='" + battle_effect + '\'' +
                ", secondary_effect='" + secondary_effect + '\'' +
                ", secondary_rate=" + secondary_rate +
                ", critical_rate=" + critical_rate +
                ", speed_priority=" + speed_priority +
                ", attack_url='" + attack_url + '\'' +
                ", pokemon='" + pokemon + '\'' +
                '}';
    }
}
