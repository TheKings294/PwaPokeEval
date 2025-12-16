import {useLocalStorage} from "../../hooks/useLocalStorage.tsx";
import {PokedesckDefaultValue, type PokedesckStorageType} from "../../type/PokedeckStorageType.ts";
import PokemonDesk from "../../components/pokedesk/PokemonDesk.tsx";
import "./Pokedesck.css"
import type {PropsScreen} from "../../type/types.ts";

function Pokedesck({ goTo }: PropsScreen) {
    const [pokesdeskList,] = useLocalStorage<PokedesckStorageType>('pokedesk', PokedesckDefaultValue)

    return (
        <>
            <button className={"pokemon-btn back-home-btn"} onClick={() => goTo("home")}>Home</button>
            <div className="pokedesk">
                {
                    pokesdeskList.map((pokemon) => (
                        <PokemonDesk pokemon={pokemon} />
                    ))
                }
            </div>
        </>
    )
}

export default Pokedesck