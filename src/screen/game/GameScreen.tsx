import "./GameScreen.css"
import ShearchPokemon from "../../components/game/shearchPokemon/ShearchPokemon.tsx";
import type {Content, PropsScreen} from "../../type/types.ts";
import {useState} from "react";
import * as React from "react";
import PokemonCapture from "../../components/game/pokemonCapture/PokemonCapture.tsx";
import {PokemonGame} from "../../utils/PokemonGame.ts";

function GameScreen({ goTo }: PropsScreen) {
    const [content, setContent] = useState<Content>("search");
    const pokemonClass = new PokemonGame({
        changeContent: setContent
    });

    const contentRef: Record<Content, React.ReactNode> = {
        search: <ShearchPokemon />,
        game: <PokemonCapture />,
    }


    pokemonClass.GameRun()

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