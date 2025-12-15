import type {PokemonStorageType} from "../../type/PokedeckStorageType.ts";
import "./PokemonDesk.css"
import Question from "/svg/question.svg"

function PokemonDesk(props: {
    pokemon: PokemonStorageType;
}) {

    let classeType = "electric"

    switch (props.pokemon.type.split("/")[0]) {
        case 'Eau': classeType = "water"; break;
        case 'Feu': classeType = "fire"; break;
        case 'Électrik': classeType = "electric"; break;
        case 'Poison': classeType = "poison"; break;
        case 'Vol': classeType = "flying"; break;
        case 'Plante': classeType = "grass"; break;
        case 'Normal': classeType = "normal"; break;
        default: classeType = "normal"; break;
    }

    return (
        <div className={"pokemon-card " + (props.pokemon.isDiscover ? "" : "not-discover")}>
            <img
                src={props.pokemon.imageUrl.length !== 0 ? props.pokemon.imageUrl : Question}
                alt={props.pokemon.name}
                className="pokemon-image"
            />

            <div className="pokemon-info">
                <h2 className="pokemon-name">{props.pokemon.name}</h2>

                <div className="pokemon-types">
                    <span className={"type " + classeType}>{props.pokemon.type}</span>
                </div>
            </div>
        </div>
    )
}

export default PokemonDesk