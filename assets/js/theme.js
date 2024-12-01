"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $HTML = document.documentElement;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const $themeBtn = document.querySelector("[theme-btn]");
    const $headerLogo = document.querySelector(".header-logo");
    const $footerLogo = document.querySelector("footer img");

    if (sessionStorage.getItem("theme")) {
        $HTML.dataset.theme = sessionStorage.getItem("theme");
    } else {
        $HTML.dataset.theme = isDark ? "dark" : "light";
    }

    let isPressed = false;

    const changeTheme = function (button) {
        isPressed = !isPressed;
        button.setAttribute("btn-pressed", isPressed);
        $HTML.setAttribute("data-theme", $HTML.dataset.theme === "light" ? "dark" : "light");
        sessionStorage.setItem("theme", $HTML.dataset.theme);
    };

    const checkThemeBtn = function () {
        const isDarkTheme = $HTML.getAttribute("data-theme") === "dark";

        $themeBtn.innerHTML = isDarkTheme
            ? `<span class="fa-regular fa-sun"></span>`
            : `<span class="fa-regular fa-moon"></span>`;

        updateLogo()    
    };


    const updateLogo = function () {
        const isDarkTheme = $HTML.getAttribute("data-theme") === "dark";
        
        $headerLogo.src = isDarkTheme ? "./assets/images/darklogo2.png" : "./assets/images/lightlogo2.png";
        
        $footerLogo.src = isDarkTheme ? "./assets/images/darklogo2.png" : "./assets/images/lightlogo2.png";
    };
    

    if ($themeBtn) {
        checkThemeBtn();

        $themeBtn.addEventListener("click", () => {
            changeTheme($themeBtn);
            checkThemeBtn();
        });
    }

    updateLogo()
});
