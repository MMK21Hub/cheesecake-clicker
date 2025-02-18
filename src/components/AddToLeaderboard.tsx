import { game } from "../gameData"
import { fetchLeaderboard } from "../leaderboardData"
import Button from "./ui/Button"

export function usernamePrompt() {
  const existingUsername = game.data.leaderboardEntry?.username
  const usernameText = existingUsername ? "new username" : "username"
  return prompt(
    `Pick a ${usernameText} for the leaderboard (will be shown publicly)`,
    existingUsername
  )
}

async function initialiseLeaderboardEntry() {
  const username = usernamePrompt()
  if (!username) return
  await game.initLeaderboardEntry(username)
  await fetchLeaderboard()
}

function AddToLeaderboard() {
  return (
    <Button
      class="large-button pop-in"
      show={() =>
        !game.data.leaderboardEntry && game.allTimeCheesecakes() >= 10
      }
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
