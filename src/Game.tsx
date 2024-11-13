import BigCheesecake from "./BigCheesecake"
import { typedStore } from "./reactivity"

const defaultGameData = {
  cheesecakes: 0,
}

export const gameData = typedStore<typeof defaultGameData>(
  JSON.parse(localStorage.getItem("cheesecake-data") || "null") ||
    defaultGameData
)

// @ts-ignore shh, it's for debugging
window.gameData = gameData

export function saveGame() {
  localStorage.setItem("cheesecake-data", JSON.stringify(gameData))
}

saveGame()

setInterval(saveGame, 1000)

function Game(): JSX.Element {
  return (
    <>
      <div class="top-area">
        <div class="cheesecake-count">
          <span>{() => gameData.cheesecakes.toLocaleString()} cheesecakes</span>
        </div>
      </div>
      <div class="middle-area">
        <BigCheesecake />
      </div>
    </>
  )
}

export default Game
