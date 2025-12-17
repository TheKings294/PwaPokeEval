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
    private readonly setPokemon!: Dispatch<SetStateAction<Pokemon | undefined>>; // new
    private pokemon !: Pokemon;
    private axiosI : AxiosInstance = axios.create({
        baseURL: "https://pokeapi.co/api/v2",
        timeout: 5000,
    })
    private setPokedeck: React.Dispatch<
        React.SetStateAction<PokedesckStorageType>
    >
    private setCountLunch : React.Dispatch<React.SetStateAction<number>>
    private setPokemonTeam: React.Dispatch<React.SetStateAction<TeamStorageType>>
    private openModal: (status: boolean) => void

    constructor(
        game: GameCaptureDTO,
    ) {
        this.changeContent = game.changeContent;
        this.setPokemon = game.setPokemon;
        this.setPokedeck = game.setPokedeck;
        this.setCountLunch = game.setCountLunch;
        this.setPokemonTeam = game.setTeam
        this.openModal = game.openModal;
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

    public getPokemon() : Pokemon {
        return this.pokemon;
    }

    private isShinny(): boolean {
        const shinny = Math.floor(Math.random() * 512) === 0;
        if (shinny && Notification.permission === "granted") {
            new Notification("Attention un shinny", {
                body: "Vous avez un shinny a capturé",
                icon: "/icon/144.png",
                badge: "/icon/144.png"
            })
        }
        return shinny
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
            'id' in item &&
            'hp' in item &&
            'cries' in item &&
            'sprite' in item
        );
    }

    public updateTeam(pokemon: Pokemon, remove ?: boolean, index ?: number): void {
        if (remove && index) {
            console.log(index, pokemon.id);
            this.setPokemonTeam(prev => {
                if (index < 0 || index > 5) return prev;
                const newTeam: TeamStorageType = prev.map(p =>
                    p && p.id === pokemon.id ? pokemon : p
                ) as TeamStorageType;
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

    public capturePokemon(count: number, pokemonTeam: TeamStorageType): boolean {
        console.log("Here")
        if (count === 3) return false;

        if (!this.isLucky()) {
            console.log("not lucky")
            this.setCountLunch(prev => prev + 1)
            return false;
        }

        console.log(pokemonTeam.every(item => this.isPokemon(item)))
        console.log(pokemonTeam)

        if (pokemonTeam.every(item => this.isPokemon(item))) {
            console.log("Team full")
            this.setCountLunch(0)
            this.openModal(true)
            return true;
        }

        console.log("classic")
        this.updateTeam(this.pokemon);
        this.setCountLunch(0)
        return true;
    }
}