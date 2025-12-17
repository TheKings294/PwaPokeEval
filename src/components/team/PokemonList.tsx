import type {Pokemon} from "../../type/types.ts";
import "./PokemonList.css"
import type {TeamStorageType} from "../../type/TeamStorageType.ts";

type PokemonListProps = {
    pokemons: TeamStorageType;
    onDelete?: (pokemon: Pokemon, remove ?: boolean, index ?: number) => void;
    pokemonReplacement?: Pokemon;
}

export default function PokemonList({ pokemons, onDelete, pokemonReplacement }: PokemonListProps) {
    return (
        <ul className="pokemon-list">
            {pokemons
                .filter((pokemon): pokemon is Pokemon => pokemon !== null)
                .map((pokemon) => (
                    <li key={pokemon.id} className="pokemon-item">
                <div className="pokemon-info">
                <img
                    src={pokemon.sprite}
                alt={pokemon.name}
                className="pokemon-image"
                />
                <span className="pokemon-name">{pokemon.name}</span>
                    </div>

    {onDelete && pokemonReplacement && (
        <button
            className="delete-btn"
        onClick={() => onDelete(pokemonReplacement, true, pokemon.id)}
        aria-label={`Delete ${pokemon.name}`}
    >
    🗑️
            </button>
    )}
    </li>
))}
    </ul>
);
}
