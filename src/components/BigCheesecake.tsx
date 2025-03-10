import { h } from "voby"
import { game } from "../gameData"
import { particlesContainer } from ".."

function clickCheesecake(source: MouseEvent | KeyboardEvent | null = null) {
  game.incrementCheesecakes(1)
  if (source instanceof MouseEvent) {
    const particle = h("div", {
      class: "cheesecake-particle",
      style: {
        position: "absolute",
        left: `${source.clientX}px`,
        top: `${source.clientY}px`,
      },
    })() as HTMLDivElement
    particlesContainer.append(particle)
    setTimeout(() => {
      particle.classList.add("fade-out")
    }, 800)
    setTimeout(() => {
      // Prevent old particles lingering in the DOM
      particle.remove()
    }, 2000)
  }
}

function BigCheesecake() {
  return (
    <div class="big-cheesecake-container">
      <button
        class="big-cheesecake"
        onClick={(event) => {
          clickCheesecake(event)
        }}
        onKeyDown={(event) => {
          const element = event.target as HTMLButtonElement
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault()
            element.classList.add("active")
          }
        }}
        onKeyUp={(event) => {
          const element = event.target as HTMLButtonElement
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault()
            element.classList.remove("active")
            clickCheesecake(event)
          }
        }}
        type="button"
      >
        <img
          src="/assets/cheesecake-temp-design.png"
          alt="Big Cheesecake"
          draggable={false}
        />
      </button>
    </div>
  )
}

export default BigCheesecake
