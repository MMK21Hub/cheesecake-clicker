import { typedStore } from "./reactivity"

export type GameData = typeof defaultGameData
export type GameConfig = typeof gameConfig

export const gameConfig = {
  leaderboard: {
    apiBaseUrl: "https://cheesecake-worker.mmk21-spam.workers.dev/",
  },
}

const defaultGameData = {
  cheesecakes: 0,
}

class Game {
  readonly LOCAL_STORAGE_KEY = "cheesecake-data"
  data: GameData
  config: GameConfig

  constructor(config: GameConfig) {
    this.config = config
    this.data = typedStore(defaultGameData)
  }

  private loadSavedData() {
    const savedData = JSON.parse(
      localStorage.getItem("cheesecake-data") || "null"
    )
    if (!savedData) return
    if (typeof savedData !== "object")
      throw new Error("Invalid data from localstorage")
    for (const key in savedData) {
      const validKey = key as keyof GameData
      this.data[validKey] = savedData[key]
    }
  }

  init() {
    this.loadSavedData()
    setInterval(this.saveGame, 1000)
    this.saveGame()
    return this
  }

  saveGame() {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.data))
  }

  incrementCheesecakes(count: number) {
    this.data.cheesecakes += count
  }

  resetCheesecakes() {
    this.data.cheesecakes = 0
  }

  currentCheesecakes() {
    return this.data.cheesecakes
  }
}

export const game = new Game(gameConfig).init()

// @ts-ignore shh, it's for debugging
window.game = game
