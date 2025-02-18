import "./leaderboard.css"
import { $$, For, FunctionMaybe } from "voby"
import { ERROR, leaderboardData, LOADING } from "../leaderboardData"

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
