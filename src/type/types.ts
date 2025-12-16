export type Pages = "home" | "game" | "pokedeck"
export type PropsScreen = {
    goTo : (pages: Pages) => void
}
export type Content = "search" | "game"