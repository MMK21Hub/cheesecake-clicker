import { render } from "voby"
import Game from "./Game"

const gameElement = document.querySelector("#game")
if (!gameElement) {
  throw new Error("No game element found")
}

render(<Game />, gameElement)
