import React, {type Dispatch, type SetStateAction} from "react";
import type {Content, Pokemon} from "../type/types.ts";
import type {PokedesckStorageType} from "../type/PokedeckStorageType.ts";
import type {TeamStorageType} from "../type/TeamStorageType.ts";

export type GameCaptureDTO = {
    changeContent: Dispatch<SetStateAction<Content>>
    setPokemon: Dispatch<SetStateAction<Pokemon | null>>
    pokedeck: PokedesckStorageType,
    setPokedeck: Dispatch<SetStateAction<PokedesckStorageType>>
    countLunch: number
    setCountLunch : React.Dispatch<React.SetStateAction<number>>
    team: TeamStorageType,
    setTeam: Dispatch<SetStateAction<TeamStorageType>>
}