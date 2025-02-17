import { gameData } from "./gameData"
import BigCheesecake from "./BigCheesecake"
import Leaderboard from "./components/Leaderboard"
import Button from "./components/ui/Button"

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
      <div class="bottom-area">
        <div class="button-row">
          <Button class="large-button">Join the leaderboard</Button>
        </div>
      </div>
    </>
  )
}

export default Game
