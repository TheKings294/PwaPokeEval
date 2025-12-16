import type {GameCaptureDTO} from "./DTO.ts";
import type {Dispatch, SetStateAction} from "react";
import type {Content, Pokemon} from "../type/types.ts";
import axios from "axios";
import type {AxiosInstance} from "axios";

export class PokemonGame {
    private readonly changeContent: Dispatch<SetStateAction<Content>>;
    private readonly setPokemon!: Dispatch<SetStateAction<Pokemon | null>>; // new
    private pokemon !: Pokemon;
    private axiosI : AxiosInstance = axios.create({
        baseURL: "https://pokeapi.co/api/v2",
        timeout: 5000,
    })

    constructor(game: GameCaptureDTO) {
        this.changeContent = game.changeContent;
        this.setPokemon = game.setPokemon;
    }

    public GameRun(): void {
        this.OnePokemon();
        setInterval(() => this.changeContent('game'), 5000)
    }

    private async OnePokemon (): Promise<void> {
        const pokemonNumber = this.getRandom(1, 151)

        try {
            const dataAPI = await this.axiosI.get(`/pokemon/${pokemonNumber}`);
            const formatedData: Pokemon = this.FormatedData(dataAPI.data);
            this.pokemon = formatedData;
            this.setPokemon(formatedData)
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    }

    private getRandom(min: number, max: number): number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public getPokemon() : object {
        return this.pokemon;
    }

    private FormatedData(data: object): Pokemon {
        return {
            name: data.name as string,
            sprite: data.sprites.front_default as string,
            cries: data.cries.legacy as string,
            type: data.types as {type: {name: string}}[],
            hp: data.stats[0].base_stat as number
        }
    }
}