import "./Waiting.css"
import ThemeSwitch from "../../components/ThemeSwitch.tsx";

function WaitingScreen() {
    return (
        <>
            <ThemeSwitch />
            <div className={"waiting-container"}>
                <button className={"pokemon-btn"}>Partir a la chasse</button>
                <button className={"pokemon-btn"}>Pokedesk</button>
                <button className={"pokemon-btn"}>New Feature</button>
            </div>
        </>
    )
}

export default WaitingScreen