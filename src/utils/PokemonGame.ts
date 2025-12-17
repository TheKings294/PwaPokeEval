import type {GameCaptureDTO} from "./DTO.ts";
import type {Dispatch, SetStateAction} from "react";
import type {Content, PokemonResponse, Pokemon} from "../type/types.ts";
import axios from "axios";
import type {AxiosInstance} from "axios";
import type {PokedesckStorageType} from "../type/PokedeckStorageType.ts";
import React from "react"
import type {TeamStorageType} from "../type/TeamStorageType.ts";

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
    private countLunch: number
    private setCountLunch : React.Dispatch<React.SetStateAction<number>>
    private PokemonTeam: TeamStorageType
    private setPokemonTeam: React.Dispatch<React.SetStateAction<TeamStorageType>>

    constructor(
        game: GameCaptureDTO,
    ) {
        this.changeContent = game.changeContent;
        this.setPokemon = game.setPokemon;
        //this.pokedeck = game.pokedeck;
        this.setPokedeck = game.setPokedeck;
        this.countLunch = game.countLunch;
        this.setCountLunch = game.setCountLunch;
        this.PokemonTeam = game.team;
        this.setPokemonTeam = game.setTeam
    }

    public GameRun(): void {
        this.OnePokemon()
            .then(() => {
                this.updatePokedeck(this.pokemon)
                this.setFrenchName().
                    then(() => {
                        this.setPokemon(this.pokemon);
                })
            })
        setInterval(() => this.changeContent('game'), this.getRandom(1, 10) * 1000)
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

    private isLucky(): boolean {
        return Math.random() < 0.15
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

    private isPokemon(item: any): item is Pokemon {
        return (
            item !== null &&
            typeof item === 'object' &&
            'name' in item &&
            'type' in item &&
            'number' in item
        );
    }

    public updateTeam(pokemon: Pokemon, remove ?: boolean, index ?: number): void {
        if (remove && index) {
            this.setPokemonTeam(prev => {
                const newTeam = [...prev] as TeamStorageType;
                newTeam[index] = pokemon;
                return newTeam;
            });
        } else {
            this.setPokemonTeam(prev => {
                const newTeam = [...prev];
                const index = newTeam.findIndex(p => p === null);
                if (index !== -1) {
                    newTeam[index] = pokemon;
                }
                return newTeam as TeamStorageType;
            });
        }
    }

    public capturePokemon(): boolean {
        if (this.countLunch === 3) return false;

        if (!this.isLucky()) {
            this.setCountLunch(prev => prev + 1)
            return false;
        }

        if (this.PokemonTeam.every(item => this.isPokemon(item))) {
            this.setCountLunch(0)
            return false;
        }

        this.updateTeam(this.pokemon);
        this.setCountLunch(0)
        return true;
    }
}