import type {Dispatch, SetStateAction} from "react";
import type {Content, Pokemon} from "../type/types.ts";

export type GameCaptureDTO = {
    changeContent: Dispatch<SetStateAction<Content>>
    setPokemon: Dispatch<SetStateAction<Pokemon | null>>
}