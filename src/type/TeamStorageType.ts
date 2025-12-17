import type {Pokemon} from "./types.ts";

export type TeamStorageType = [Pokemon | null, Pokemon | null, Pokemon | null, Pokemon | null, Pokemon | null, Pokemon | null];
export const DefaultTeamStorage: TeamStorageType = [null, null, null, null, null, null];
