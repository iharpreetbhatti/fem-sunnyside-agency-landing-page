import toggleMenu from "./toggleMenu"

const hamburgerIcon = document.querySelector(".navbar-burger"),
  menu = document.querySelector(".navbar-menu"),
  toggleClassName = "is-active"

function loadEventListners() {
  hamburgerIcon.addEventListener("click", () =>
    toggleMenu(menu, toggleClassName)
  )
}

function Init() {
  loadEventListners()
}

export default { Init }
