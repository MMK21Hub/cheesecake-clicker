import { render } from "voby"
import Game from "./Game"

const gameElement = document.querySelector("#game")
if (!gameElement) {
  throw new Error("No game element found")
}
export const particlesContainer = document.querySelector("#particles")!
if (!particlesContainer) {
  console.error("No particles container found")
}

render(<Game />, gameElement)
