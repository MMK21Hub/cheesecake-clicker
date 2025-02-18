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
  cheesecakesAllTime: 0,
  leaderboardEntry: null as null | { name: string },
}

class Game {
  readonly LOCAL_STORAGE_KEY = "cheesecake-data"
  data: GameData
  config: GameConfig
  readonly defaultData

  constructor(config: GameConfig, defaultData: GameData) {
    this.config = config
    this.defaultData = Object.freeze(defaultData)
    this.data = typedStore(structuredClone(defaultData))
  }

  private loadSavedData() {
    const savedData = JSON.parse(
      localStorage.getItem("cheesecake-data") || "null"
    )
    if (!savedData) return
    if (typeof savedData !== "object")
      throw new Error("Invalid data from localstorage")
    for (const key in savedData) {
      // @ts-ignore - can't think how to type-guard this
      this.data[key] = savedData[key]
    }
  }

  init() {
    this.loadSavedData()
    setInterval(() => this.saveGame(), 1000)
    this.saveGame()
    return this
  }

  saveGame() {
    const data = JSON.stringify(this.data)
    localStorage.setItem(this.LOCAL_STORAGE_KEY, data)
    // console.debug("Saved game:", data)
  }

  incrementCheesecakes(count: number) {
    this.data.cheesecakes += count
    this.data.cheesecakesAllTime += count
  }

  decrementCheesecakes(count: number) {
    this.data.cheesecakes -= count
  }

  resetGame() {
    for (const key in this.defaultData) {
      if (!(key in this.data)) {
        console.warn(`Mismatched key in default data and game data: ${key}`)
        continue
      }
      // @ts-ignore - can't think how to type-guard this
      this.data[key] = this.defaultData[key]
    }
    this.saveGame()
  }

  currentCheesecakes() {
    return this.data.cheesecakes
  }

  allTimeCheesecakes() {
    return this.data.cheesecakesAllTime
  }
}

export const game = new Game(gameConfig, defaultGameData).init()

// @ts-ignore shh, it's for debugging
window.game = game
