"use strict"

const $HTML = document.documentElement
const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
const $themeBtn = document.querySelector("[theme-btn]")

if (sessionStorage.getItem("theme")) {
    $HTML.dataset.theme = sessionStorage.getItem("theme")
} else {
    $HTML.dataset.theme = isDark ? "dark" : "light"
}

let isPressed = false 

const changeTheme = function (button) {
    isPressed = isPressed ? false : true
    button.setAttribute("btn-pressed", isPressed)
    $HTML.setAttribute("data-theme", ($HTML.dataset.theme === "light") ? "dark" : "light")
    sessionStorage.setItem("theme", $HTML.dataset.theme)
    
}

const checkThemeBtn = function () {
    const isDarkTheme = $HTML.getAttribute("data-theme") === "dark"

    $themeBtn.innerHTML = isDarkTheme 
        ? `<span class="fa-regular fa-sun"></span>` 
        : `<span class="fa-regular fa-moon"></span>`
}


window.addEventListener("load", () => {
    checkThemeBtn()
    
    $themeBtn.addEventListener("click", () => {
        changeTheme($themeBtn)
        checkThemeBtn()
    })
})