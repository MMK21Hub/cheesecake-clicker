import "./button.css"

function Button(props: {
  children: JSX.Child
  class?: JSX.Class
  onClick?: (event: MouseEvent) => void
}) {
  return (
    <button class={["button", props.class]} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
