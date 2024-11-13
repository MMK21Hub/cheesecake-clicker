import { store } from "voby"

export const gameData = store(
  JSON.parse(localStorage.getItem("cheesecake-data") || "{}") || {
    cheesecakes: 0,
  }
)

export function saveGame() {
  localStorage.setItem("cheesecake-data", JSON.stringify(gameData))
}

function Game(): JSX.Element {
  return (
    <>
      <div class="top-area">
        <div class="cheesecake-count">
          <span>{() => gameData.cheesecakes} cheesecakes</span>
        </div>
      </div>
      <div class="middle-area">
        <div class="big-cheesecake-container">
          <button
            class="big-cheesecake"
            onClick={() => {
              gameData.cheesecakes += 1
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
