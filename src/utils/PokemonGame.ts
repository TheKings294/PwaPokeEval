import type {GameCaptureDTO} from "./DTO.ts";
import type {Dispatch, SetStateAction} from "react";
import type {Content, Pokemon, PokemonResponse} from "../type/types.ts";
import axios from "axios";
import type {AxiosInstance} from "axios";
import type {PokedesckStorageType} from "../type/PokedeckStorageType.ts";
import React from "react"

export class PokemonGame {
    private readonly changeContent: Dispatch<SetStateAction<Content>>;
    private readonly setPokemon!: Dispatch<SetStateAction<Pokemon | null>>; // new
    private pokemon !: Pokemon;
    private axiosI : AxiosInstance = axios.create({
        baseURL: "https://pokeapi.co/api/v2",
        timeout: 5000,
    })
    //private pokedeck: PokedesckStorageType;
    private setPokedeck: React.Dispatch<
        React.SetStateAction<PokedesckStorageType>
    >

    constructor(
        game: GameCaptureDTO,
    ) {
        this.changeContent = game.changeContent;
        this.setPokemon = game.setPokemon;
        //this.pokedeck = game.pokedeck;
        this.setPokedeck = game.setPokedeck;
    }

    public GameRun(): void {
        if (this.pokemon) {
            return;
        }
        this.OnePokemon()
            .then(() => {
                this.updatePokedeck(this.pokemon)
                this.setFrenchName().
                    then(() => {
                        this.setPokemon(this.pokemon);
                })
            })
        this.changeContent('game')
    }

    private async OnePokemon (): Promise<void> {
        const pokemonNumber = this.getRandom(1, 151)

        try {
            const dataAPI = await this.axiosI.get(`/pokemon/${pokemonNumber}`);
            const formatedData: Pokemon = this.FormatedData(dataAPI.data);
            this.pokemon = formatedData;
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    }

    private async setFrenchName(): Promise<void> {
        await this.axiosI.get(`/pokemon-species/${this.pokemon.id}`)
            .then((response) => {
                this.pokemon.name = response.data.names[4].name
            })
            .catch((error) => {
                console.error(error);
            })

    }

    private getRandom(min: number, max: number): number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public getPokemon() : object {
        return this.pokemon;
    }

    private isShinny(): boolean {
        return Math.floor(Math.random() * 512) === 0;
    }

    private FormatedData(data: PokemonResponse): Pokemon {
        return {
            id: data.id,
            name: data.name,
            sprite: this.isShinny() ? data.sprites.front_shiny : data.sprites.front_default,
            cries: data.cries.legacy,
            type: data.types,
            hp: data.stats[0].base_stat
        }
    }

    private updatePokedeck(pokemon: Pokemon): void {
        this.setPokedeck(prev =>
            prev.map(poke =>
                poke.number === pokemon.id
                ? { ...poke, isDiscover: true, imageUrl: pokemon.sprite }
                    : poke
            )
        )
    }
}