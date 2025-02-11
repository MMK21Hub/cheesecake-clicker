import { FunctionMaybe } from "voby"
import "./leaderboard.css"

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
      <td class="leaderboard-item-count">{count}</td>
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
          <LeaderboardItem rank={1} name="Mish" count={1000} />
          <LeaderboardItem rank={2} name="James" count={100} />
          <LeaderboardItem rank={2} name="James 2" count={100} />
          <LeaderboardItem rank={2} name="James 3" count={100} />
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
