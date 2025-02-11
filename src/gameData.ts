import { typedStore } from "./reactivity"

export const gameConfig = {
  leaderboard: {
    apiBaseUrl: "https://cheesecake-worker.mmk21-spam.workers.dev/",
  },
}

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
