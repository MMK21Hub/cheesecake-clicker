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
        <div class="big-cheesecake-container">
          <button
            class="big-cheesecake"
            onClick={() => {
              gameData.cheesecakes += 1
            }}
            onKeyDown={(event) => {
              const element = event.target as HTMLButtonElement
              if (event.key === " " || event.key === "Enter") {
                event.preventDefault()
                element.classList.add("active")
              }
            }}
            onKeyUp={(event) => {
              const element = event.target as HTMLButtonElement
              if (event.key === " " || event.key === "Enter") {
                event.preventDefault()
                element.classList.remove("active")
                gameData.cheesecakes += 1
              }
            }}
            type="button"
          >
            <img
              src="/assets/cheesecake-temp-design.png"
              alt="Big Cheesecake"
              draggable={false}
            />
          </button>
        </div>
      </div>
    </>
  )
}

export default Game
