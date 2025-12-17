import "./ShearchPokemon.css"

function ShearchPokemon() {
    return (
        <>
            <div className="search-container">
                <div className="magnifier">
                    <div className="glass"></div>
                    <div className="handle"></div>
                </div>

                <p className="search-text">Searching for a pokemon...</p>
            </div>
        </>
    )
}

export default ShearchPokemon;