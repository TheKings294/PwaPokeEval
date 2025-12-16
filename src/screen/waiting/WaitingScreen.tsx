import "./Waiting.css"
import ThemeSwitch from "../../components/ThemeSwitch.tsx";
import type {PropsScreen} from "../../type/types.ts";


function WaitingScreen({ goTo }: PropsScreen) {
    return (
        <>
            <ThemeSwitch />
            <div className={"waiting-container"}>
                <button className={"pokemon-btn"} onClick={() => goTo("game")}>Partir a la chasse</button>
                <button className={"pokemon-btn"} onClick={() => goTo("pokedeck")}>Pokedesk</button>
                <button className={"pokemon-btn"}>New Feature</button>
            </div>
        </>
    )
}

export default WaitingScreen