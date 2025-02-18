import { game } from "../gameData"
import { fetchLeaderboard } from "../leaderboardData"
import Button from "./ui/Button"

async function initialiseLeaderboardEntry() {
  const username = prompt("Pick a username for the leaderboard")
  if (!username) return
  await game.initLeaderboardEntry(username)
  await fetchLeaderboard()
}

function AddToLeaderboard() {
  return (
    <Button
      class="large-button pop-in"
      show={() => game.allTimeCheesecakes() >= 10}
      onClick={() => {
        initialiseLeaderboardEntry()
        game.decrementCheesecakes(10)
      }}
    >
      Join the leaderboard
    </Button>
  )
}

export default AddToLeaderboard
