package com.example.pokemon.pokemon;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@Entity
@Table(name="pokemon_stats")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class Pokemon {
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
    private String name;
    private Integer hp;
    private Integer attack;
    private Integer special_attack;
    private Integer speed;
    private Integer defense;
    private Integer special_defense;
    private String type1;
    private String type2;

    public Pokemon() {
    }

    public Pokemon(Long id, String name, Integer hp, Integer attack, Integer special_attack, Integer speed, Integer defense, Integer special_defense, String type1, String type2) {
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.special_attack = special_attack;
        this.speed = speed;
        this.defense = defense;
        this.special_defense = special_defense;
        this.type1 = type1;
        this.type2 = type2;
    }

    public Pokemon(String name, Integer hp, Integer attack, Integer special_attack, Integer speed, Integer defense, Integer special_defense, String type1, String type2) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.special_attack = special_attack;
        this.speed = speed;
        this.defense = defense;
        this.special_defense = special_defense;
        this.type1 = type1;
        this.type2 = type2;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getHp() {
        return hp;
    }

    public void setHp(Integer hp) {
        this.hp = hp;
    }

    public Integer getAttack() {
        return attack;
    }

    public void setAttack(Integer attack) {
        this.attack = attack;
    }

    public Integer getSpecial_attack() {
        return special_attack;
    }

    public void setSpecial_attack(Integer special_attack) {
        this.special_attack = special_attack;
    }

    public Integer getSpeed() {
        return speed;
    }

    public void setSpeed(Integer speed) {
        this.speed = speed;
    }

    public Integer getDefense() {
        return defense;
    }

    public void setDefense(Integer defense) {
        this.defense = defense;
    }

    public Integer getSpecial_defense() {
        return special_defense;
    }

    public void setSpecial_defense(Integer special_defense) {
        this.special_defense = special_defense;
    }

    public String getType1() {
        return type1;
    }

    public void setType1(String type1) {
        this.type1 = type1;
    }

    public String getType2() {
        return type2;
    }

    public void setType2(String type2) {
        this.type2 = type2;
    }

    @Override
    public String toString() {
        return "Pokemon{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", hp=" + hp +
                ", attack=" + attack +
                ", special_attack=" + special_attack +
                ", speed=" + speed +
                ", defense=" + defense +
                ", special_defense=" + special_defense +
                ", type1='" + type1 + '\'' +
                ", type2='" + type2 + '\'' +
                '}';
    }
}
