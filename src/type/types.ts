export type Pages = "home" | "game" | "pokedeck"
export type PropsScreen = {
    goTo : (pages: Pages) => void
}
export type Content = "search" | "game"

export type Pokemon = {
    id: number,
    name: string,
    sprite: string,
    cries: string,
    type: {type: {name: string}}[],
    hp: number,
}
 export interface PokemonResponse {
        id: number,
     name: string,
     sprites: {
         front_default: string,
         front_shiny: string,
     },
     cries: {
         legacy: string,
     },
     types: {type: {name: string}}[],
     stats: [
         {base_stat: number},
     ]
 }