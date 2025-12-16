export type Pages = "home" | "game" | "pokedeck"
export type PropsScreen = {
    goTo : (pages: Pages) => void
}
export type Content = "search" | "game"

export type Pokemon = {
    name: string,
    sprite: string,
    cries: string,
    type: {type: {name: string}}[],
    hp: number,
}