// Function to set the initial theme based on localStorage or system preference
// This runs immediately when the script is loaded to set the correct class on <html>
(function () {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    let theme = "light";

    if (savedTheme === "dark" || savedTheme === "light") {
        theme = savedTheme;
    } else if (systemPrefersDark) {
        theme = "dark";
    }

    // Apply the theme class to the <html> element
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
})();

// Function to toggle the theme (to be called by a button in your React components)
function toggleTheme() {
    const current = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    const next = current === "dark" ? "light" : "dark";

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);

    localStorage.setItem("theme", next);
}