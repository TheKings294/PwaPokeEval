import "./GameScreen.css"
import ShearchPokemon from "../../components/game/shearchPokemon/ShearchPokemon.tsx";
import type {Content, Pokemon, PropsScreen} from "../../type/types.ts";
import {useEffect, useRef, useState} from "react";
import * as React from "react";
import PokemonCapture from "../../components/game/pokemonCapture/PokemonCapture.tsx";
import {PokemonGame} from "../../utils/PokemonGame.ts";
import {useLocalStorage} from "../../hooks/useLocalStorage.tsx";
import {PokedesckDefaultValue, type PokedesckStorageType} from "../../type/PokedeckStorageType.ts";
import {DefaultTeamStorage, type TeamStorageType} from "../../type/TeamStorageType.ts";
import Toast from "../../components/Toast.tsx";
import Modal from "../../components/Modal.tsx";
import PokemonList from "../../components/team/PokemonList.tsx";
import {requestPermission} from "../../utils/Notification.ts";

function GameScreen({ goTo }: PropsScreen) {
    const [content, setContent] = useState<Content>("search");
    const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
    const [lunch, setLunch] = useState<number>(0);
    const pokemonClassRef = useRef<PokemonGame | null>(null);
    const [, setPokedeck] = useLocalStorage<PokedesckStorageType>('pokedesk', PokedesckDefaultValue)
    const [team, setTeam] = useLocalStorage<TeamStorageType>("team", DefaultTeamStorage);
    const [message, setMessage] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        pokemonClassRef.current = new PokemonGame({
            changeContent: setContent,
            setPokemon: setPokemon,
            setPokedeck: setPokedeck,
            setCountLunch: setLunch,
            setTeam: setTeam,
            openModal: setIsModalOpen
        });

        pokemonClassRef.current.GameRun();
    }, []);

    async function capture() {
        const result = pokemonClassRef.current?.capturePokemon(lunch, team)

        if (!result && lunch >= 3) {
            setContent("search");
            setLunch(0)
            pokemonClassRef.current?.GameRun();
        }

        if (!result && lunch < 3) {
            setMessage("La tentative a échoué")
            setTimeout(() => setMessage(""), 3000);
        }

        if (result) {
            setMessage("Pokemon Capturé")
            if (Notification.permission === "granted") {
                new Notification("Nouvelle capture", {
                    body: "Vous avez attrapé un pokemon",
                    icon: "/icon/144.png",
                    badge: "/icon/144.png"
                })
            } else if (Notification.permission !== "denied") {
                const granted = await requestPermission();
                if (granted) new Notification("Nouvelle capture", {
                    body: "Vous avez attrapé un pokemon",
                    icon: "/icon/144.png",
                    badge: "/icon/144.png"
                });
            }
            setTimeout(() => setMessage(""), 3000);
            setLunch(0)
            setContent("search");
            pokemonClassRef.current?.GameRun()
        }

    }

    function run() {
        setContent("search");
        pokemonClassRef.current?.GameRun();
    }

    const contentRef: Record<Content, React.ReactNode> = {
        search: <ShearchPokemon />,
        game: pokemon ? <PokemonCapture pokemon={pokemon} capture={capture} run={run} /> : <p>Loading Pokémon...</p>,
    }

    return (
        <>
            <button className={"pokemon-btn back-home-btn"} onClick={() => goTo("home")}>Home</button>
            {message && <Toast message={message} />}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                   children={<PokemonList
                       pokemons={team}
                       onDelete={(pokemonItem, remove, index) => {
                           pokemonClassRef.current?.updateTeam(pokemonItem, remove, index)
                           setIsModalOpen(false);
                       }}
                       pokemonReplacement={pokemon} />}
            />
            {
                contentRef[content]
            }
        </>
    )
}

export default GameScreen