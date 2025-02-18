import { $ } from "voby"
import { game } from "./gameData"

export const LOADING = Symbol("loading")
export const ERROR = Symbol("error")

interface LeaderboardAPIItem {
  username: string
  score: number
}
type LeaderboardAPIResponse = LeaderboardAPIItem[]
type LeaderboardDataMaybe =
  | LeaderboardAPIResponse
  | typeof LOADING
  | typeof ERROR

export async function fetchLeaderboard() {
  const url = new URL(game.config.leaderboard.apiBaseUrl)
  const data: LeaderboardAPIResponse | typeof ERROR = await fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Failed to fetch leaderboard data", error)
      return ERROR
    })
  leaderboardData(data)
  return data
}

export async function updateLeaderboard({
  username,
  score,
  userId,
}: {
  username: string
  score: number
  userId: string
}) {
  const url = new URL(game.config.leaderboard.apiBaseUrl)
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, score, userId }),
  })
  if (!response.ok)
    return console.error("Failed to update leaderboard", response)
  return response.json()
}

export const leaderboardData = $<LeaderboardDataMaybe>(LOADING)
