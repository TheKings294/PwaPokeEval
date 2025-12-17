import "./GameScreen.css"
import ShearchPokemon from "../../components/game/shearchPokemon/ShearchPokemon.tsx";
import type {Content, Pokemon, PropsScreen} from "../../type/types.ts";
import {useEffect, useRef, useState} from "react";
import * as React from "react";
import PokemonCapture from "../../components/game/pokemonCapture/PokemonCapture.tsx";
import {PokemonGame} from "../../utils/PokemonGame.ts";
import {useLocalStorage} from "../../hooks/useLocalStorage.tsx";
import {PokedesckDefaultValue, type PokedesckStorageType} from "../../type/PokedeckStorageType.ts";

function GameScreen({ goTo }: PropsScreen) {
    const [content, setContent] = useState<Content>("search");
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const pokemonClassRef = useRef<PokemonGame | null>(null);
    const [pokedeck, setPokedeck] = useLocalStorage<PokedesckStorageType>('pokedesk', PokedesckDefaultValue)

    const contentRef: Record<Content, React.ReactNode> = {
        search: <ShearchPokemon />,
        game: pokemon ? <PokemonCapture pokemon={pokemon} /> : <p>Loading Pokémon...</p>,
    }

    useEffect(() => {
        pokemonClassRef.current = new PokemonGame({
            changeContent: setContent,
            setPokemon: setPokemon,
            pokedeck: pokedeck,
            setPokedeck: setPokedeck
        });

        pokemonClassRef.current.GameRun();
    }, []);

    return (
        <>
            <button className={"pokemon-btn back-home-btn"} onClick={() => goTo("home")}>Home</button>
            {
                contentRef[content]
            }
        </>
    )
}

export default GameScreen