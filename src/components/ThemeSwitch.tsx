import { useEffect, useState } from "react";

function ThemeSwitch() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light");
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <button onClick={toggleTheme}>
            Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
    );
}

export default ThemeSwitch;
