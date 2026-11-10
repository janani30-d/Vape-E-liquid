
(function () {

    const THEME_KEY = "vaporTheme";
    const RTL_KEY = "vaporDirection";

    const THEME_BUTTONS =
        "#vaporThemeToggle, #vaporLoginTheme";

    const RTL_BUTTONS =
        "#vaporRtlToggle, #vaporLoginRtl";

    // APPLY DARK / LIGHT MODE
    function applyTheme() {

        const isDark =
            localStorage.getItem(THEME_KEY) === "dark";

        document.body.classList.toggle("dark-mode", isDark);

        document.querySelectorAll(THEME_BUTTONS).forEach(button => {

            const icon = button.querySelector("i");

            if (icon) {
                icon.className = isDark
                    ? "fa-solid fa-sun"
                    : "fa-solid fa-moon";
            }

            button.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

        });
    }

    // APPLY RTL / LTR
    function applyDirection() {

        const direction =
            localStorage.getItem(RTL_KEY) || "ltr";

        document.documentElement.setAttribute("dir", direction);

        document.querySelectorAll(RTL_BUTTONS).forEach(button => {

            button.setAttribute(
                "aria-label",
                direction === "rtl"
                    ? "Switch to left-to-right"
                    : "Switch to right-to-left"
            );

        });
    }

    // INITIALIZE
    function initialize() {

        applyTheme();
        applyDirection();

        // THEME BUTTON CLICK
        document.addEventListener("click", function (event) {

            const themeButton = event.target.closest(THEME_BUTTONS);

            if (themeButton) {

                const currentTheme =
                    localStorage.getItem(THEME_KEY) || "light";

                localStorage.setItem(
                    THEME_KEY,
                    currentTheme === "dark" ? "light" : "dark"
                );

                applyTheme();
                return;
            }

            // RTL BUTTON CLICK
            const rtlButton = event.target.closest(RTL_BUTTONS);

            if (rtlButton) {

                const currentDirection =
                    document.documentElement.getAttribute("dir") || "ltr";

                localStorage.setItem(
                    RTL_KEY,
                    currentDirection === "ltr" ? "rtl" : "ltr"
                );

                applyDirection();
            }

        });

        // SYNC BETWEEN OPEN TABS
        window.addEventListener("storage", function (event) {

            if (event.key === THEME_KEY) {
                applyTheme();
            }

            if (event.key === RTL_KEY) {
                applyDirection();
            }

        });

    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize);
    } else {
        initialize();
    }

})();
