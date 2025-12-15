import {useLocalStorage} from "../../hooks/useLocalStorage.tsx";
import {PokedesckDefaultValue, type PokedesckStorageType} from "../../type/PokedeckStorageType.ts";
import PokemonDesk from "../../components/pokedesk/PokemonDesk.tsx";
import "./Pokedesck.css"

function Pokedesck() {
    const [pokesdeskList,] = useLocalStorage<PokedesckStorageType>('pokedesk', PokedesckDefaultValue)

    return (
        <>
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