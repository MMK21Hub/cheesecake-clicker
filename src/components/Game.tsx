import { game } from "../gameData"
import BigCheesecake from "./BigCheesecake"
import Leaderboard from "./Leaderboard"
import Button from "./ui/Button"

function Game(): JSX.Element {
  return (
    <>
      <div class="floating-things">
        <Leaderboard />
      </div>
      <div class="top-area">
        <div class="widget cheesecake-count">
          <span>
            {() => game.currentCheesecakes().toLocaleString()} cheesecakes
          </span>
        </div>
      </div>
      <div class="middle-area">
        <BigCheesecake />
      </div>
      <div class="bottom-area">
        <div class="button-row">
          <Button
            class="large-button pop-in"
            show={() => game.allTimeCheesecakes() >= 10}
            onClick={() => {
              game.decrementCheesecakes(10)
            }}
          >
            Join the leaderboard
          </Button>
        </div>
        <div class="button-row">
          <Button
            class="pop-in"
            show={() => game.allTimeCheesecakes() > 0}
            onClick={() =>
              window.confirm(
                `You sure you want to throw all your progress away? (including ${game.allTimeCheesecakes()} cheesecakes)`
              ) && game.resetGame()
            }
          >
            Reset game
          </Button>
        </div>
      </div>
    </>
  )
}

export default Game
