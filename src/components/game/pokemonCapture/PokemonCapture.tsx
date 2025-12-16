import "./PokemonCapture.css"

function PokemonCapture () {
    return (
        <>
            <div className="monster-page">
                <header className="monster-hud">
                    <div className="hud-left">
                        <h1 className="monster-name">Charmander</h1>
                        <span className="monster-type fire">Fire</span>
                    </div>

                    <div className="hud-right">
                        <span className="monster-hp">❤️ 39 / 39</span>
                    </div>
                </header>

                <main className="monster-stage">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
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