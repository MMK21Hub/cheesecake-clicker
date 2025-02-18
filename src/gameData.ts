import { fetchLeaderboard, updateLeaderboard } from "./leaderboardData"
import { typedStore } from "./reactivity"

export type GameData = typeof defaultGameData
export type GameConfig = typeof gameConfig

const gameConfig = {
  leaderboard: {
    apiBaseUrl: "https://cheesecake-worker.mmk21-spam.workers.dev/",
    pollIntervalSecs: 60,
    pushIntervalSecs: 60,
  },
}

const defaultGameData = {
  cheesecakes: 0,
  cheesecakesAllTime: 0,
  leaderboardEntry: null as null | {
    username: string
    userId: string
    lastCheesecakeCount: number
  },
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
    this.saveGame()
    setInterval(() => this.saveGame(), 1000)
    setInterval(
      () => this.data.leaderboardEntry && this.sendLeaderboardData(),
      1000 * this.config.leaderboard.pushIntervalSecs
    )
    this.data.leaderboardEntry && this.sendLeaderboardData()
    setInterval(
      () => fetchLeaderboard(),
      1000 * this.config.leaderboard.pollIntervalSecs
    )
    fetchLeaderboard()
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

  async initLeaderboardEntry(username: string) {
    if (this.data.leaderboardEntry)
      throw new Error("We already have an entry on the leaderboard!")
    const userId = crypto.randomUUID()
    const currentCheesecakes = this.currentCheesecakes()
    await updateLeaderboard({
      userId,
      username,
      score: currentCheesecakes,
    })
    this.data.leaderboardEntry = {
      username,
      userId,
      lastCheesecakeCount: currentCheesecakes,
    }
    await fetchLeaderboard()
  }

  async sendLeaderboardData() {
    if (!this.data.leaderboardEntry)
      throw new Error("We're not on the leaderboard yet!")
    const currentCheesecakes = this.currentCheesecakes()
    const { username, userId, lastCheesecakeCount } = this.data.leaderboardEntry
    if (currentCheesecakes === lastCheesecakeCount)
      return console.debug("No changes to send to the leaderboard")
    await updateLeaderboard({
      userId,
      username,
      score: currentCheesecakes,
    })
    console.debug("Updated cloud leaderboard with score:", currentCheesecakes)
    this.data.leaderboardEntry.lastCheesecakeCount = currentCheesecakes
    await fetchLeaderboard()
  }

  async updateCloudLeaderboardUsername(newUsername: string) {
    if (!this.data.leaderboardEntry)
      throw new Error("We're not on the leaderboard yet!")
    this.data.leaderboardEntry.username = newUsername
    await updateLeaderboard({
      userId: this.data.leaderboardEntry.userId,
      username: newUsername,
      score: this.currentCheesecakes(),
    })
    await fetchLeaderboard()
  }
}

export const game = new Game(gameConfig, defaultGameData)
game.init()

// @ts-ignore shh, it's for debugging
window.game = game
