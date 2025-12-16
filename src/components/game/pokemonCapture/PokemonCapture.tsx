import "./PokemonCapture.css"
import type {Pokemon} from "../../../type/types.ts";

type CaptureDTO = {
    pokemon: Pokemon
}

function PokemonCapture({pokemon}: CaptureDTO) {
    return (
        <>
            <div className="monster-page">
                <header className="monster-hud">
                    <div className="hud-left">
                        <h1 className="monster-name">{ pokemon.name }</h1>
                        {
                            pokemon.type.map((t: {type: {name: string}}, index) => (
                                <span className={`monster-type ${t.type.name}`} key={index}>
                                    {t.type.name}
                                </span>
                            ))
                        }
                    </div>

                    <div className="hud-right">
                        <span className="monster-hp">❤️ { pokemon.hp }</span>
                    </div>
                </header>

                <main className="monster-stage">
                    <img
                        src={ pokemon.sprite }
                        alt="Charmander"
                        className="monster-image"
                    />
                </main>

                <footer className="monster-bottom">
                    <button className="action-btn">Capture</button>
                    <button className="action-btn">Run</button>
                </footer>
            </div>
        </>
    )
}

export default PokemonCapture