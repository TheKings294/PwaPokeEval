import './App.css'
import GameScreen from "./screen/game/GameScreen.tsx";
import type {Pages} from "./type/types.ts";
import {useState} from "react";
import WaitingScreen from "./screen/waiting/WaitingScreen.tsx";
import Pokedesck from "./screen/pokedesk/Pokedesck.tsx";
import * as React from "react";
import {Notifications} from "react-push-notification";
import {requestPermission} from "./utils/Notification.ts";

function App() {
    const [page, setPage] = useState<Pages>("home");

    const screens: Record<Pages, React.ReactNode> = {
        home: <WaitingScreen goTo={setPage} />,
        game: <GameScreen goTo={setPage} />,
        pokedeck: <Pokedesck goTo={setPage} />,
    }

    requestPermission()


    return (
        <>
            <Notifications />
            {
                page !== "game" ?
                <h1>PokeCollector+</h1>
                :
                <></>
            }
            {
                screens[page]
            }
        </>
    )
}

export default App
