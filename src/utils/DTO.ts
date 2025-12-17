import type {Dispatch, SetStateAction} from "react";
import type {Content, Pokemon} from "../type/types.ts";
import type {PokedesckStorageType} from "../type/PokedeckStorageType.ts";

export type GameCaptureDTO = {
    changeContent: Dispatch<SetStateAction<Content>>
    setPokemon: Dispatch<SetStateAction<Pokemon | null>>
    pokedeck: PokedesckStorageType,
    setPokedeck: Dispatch<SetStateAction<PokedesckStorageType>>
}