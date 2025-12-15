import './App.css'
import WaitingScreen from "./screen/waiting/WaitingScreen.tsx";

function App() {

  return (
    <>
        <h1>PokeCollector+</h1>
        <section className={"main-container"}>
            <WaitingScreen />
        </section>
    </>
  )
}

export default App
