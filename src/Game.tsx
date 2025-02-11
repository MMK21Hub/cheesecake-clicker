import { gameData } from "./gameData"
import BigCheesecake from "./BigCheesecake"
import Leaderboard from "./components/Leaderboard"

function Game(): JSX.Element {
  return (
    <>
      <div class="floating-things">
        <Leaderboard />
      </div>
      <div class="top-area">
        <div class="widget cheesecake-count">
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
