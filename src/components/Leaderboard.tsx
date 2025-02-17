import { $, $$, For, FunctionMaybe } from "voby"
import "./leaderboard.css"
import { gameConfig } from "../gameData"

const LOADING = Symbol("loading")
const ERROR = Symbol("error")

interface LeaderboardAPIItem {
  username: string
  score: number
}
type LeaderboardAPIResponse = LeaderboardAPIItem[]
type LeaderboardDataMaybe =
  | LeaderboardAPIResponse
  | typeof LOADING
  | typeof ERROR

async function fetchLeaderboard() {
  const url = new URL(gameConfig.leaderboard.apiBaseUrl)
  const data: LeaderboardAPIResponse | typeof ERROR = await fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Failed to fetch leaderboard data", error)
      return ERROR
    })
  return data
}

const leaderboardData = $<LeaderboardDataMaybe>(LOADING)
fetchLeaderboard().then((data) => leaderboardData(data))

function LeaderboardItem({
  rank,
  name,
  count,
}: {
  rank: FunctionMaybe<number>
  name: FunctionMaybe<string>
  count: FunctionMaybe<number>
}) {
  return (
    <tr class="leaderboard-item">
      <td class="leaderboard-item-rank">{rank}</td>
      <td class="leaderboard-item-name">{name}</td>
      <td class="leaderboard-item-count">{count.toLocaleString()}</td>
    </tr>
  )
}

function Leaderboard() {
  return (
    <div class="widget leaderboard-widget">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr class="sr-only">
            <th>Rank</th>
            <th>Name</th>
            <th>Cheesecakes</th>
          </tr>
        </thead>
        <tbody>
          {() => {
            const data = leaderboardData()
            if (data === LOADING) return "Loading..."
            if (data === ERROR) return "Leaderboard unavailable :("
            const items = data.slice(0, 10)
            return (
              <For values={items}>
                {(item, index) => (
                  <LeaderboardItem
                    rank={() => $$(index) + 1}
                    name={item.username}
                    count={item.score}
                  />
                )}
              </For>
            )
          }}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
