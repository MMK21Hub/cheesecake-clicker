import { $$, FunctionMaybe } from "voby"
import "./button.css"

function Button(props: {
  children: JSX.Child
  class?: JSX.Class
  show?: FunctionMaybe<boolean>
  onClick?: (event: MouseEvent) => void
}) {
  const { children, class: extraClasses, show, onClick } = props
  return (
    <button
      class={[
        "button",
        extraClasses,
        show !== undefined && (() => ($$(show) ? null : "hidden")),
      ]}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
