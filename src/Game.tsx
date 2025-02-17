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
          <Button
            class="large-button pop-in"
            show={() => gameData.cheesecakes >= 10}
          >
            Join the leaderboard
          </Button>
        </div>
        <div class="button-row">
          <Button
            class="pop-in"
            show={() => gameData.cheesecakes > 0}
            onClick={() =>
              window.confirm(
                `You sure you want to throw all your ${gameData.cheesecakes} cheesecakes away?`
              ) && (gameData.cheesecakes = 0)
            }
          >
            Reset cheesecakes
          </Button>
        </div>
      </div>
    </>
  )
}

export default Game
