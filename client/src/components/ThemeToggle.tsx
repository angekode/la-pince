/**
 * Composant ThemeToggle
 * ------------------------------------------------------------
 * Ce composant affiche un bouton permettant de basculer entre
 * le thème clair ("light") et le thème sombre ("dark").
 *
 * Version autonome : pas de props, gère le thème directement.
 * 
 * Il reprend la structure d'origine (conteneur fixe en haut à droite
 * et bouton simple) tout en déportant le style visuel dans un fichier
 * CSS dédié afin d'assurer une meilleure cohérence avec le thème global.
 *
 * Le bouton adopte un style minimaliste : aucun contour, aucun relief,
 * et un fond identique à celui du dashboard pour une intégration visuelle
 * homogène.
 * ---------------------------------------------------------------------------
 */

import "../styles/theme-toggle.css";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setTheme("dark");
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="theme-toggle-wrapper">
      <button className="theme-toggle-button" onClick={toggleTheme}>
        <span className="theme-icon">
          {theme === "dark" ? "☀️" : "🌙"}
        </span>
      </button>
    </div>
  );
}
