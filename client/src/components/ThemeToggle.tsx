/**
 * Composant ThemeToggle
 * ------------------------------------------------------------
 * Ce composant affiche un bouton permettant de basculer entre
 * le thème clair ("light") et le thème sombre ("dark").
 *
 * Il reprend la structure d'origine (conteneur fixe en haut à droite
 * et bouton simple) tout en déportant le style visuel dans un fichier
 * CSS dédié afin d'assurer une meilleure cohérence avec le thème global.
 *
 * Le bouton adopte un style minimaliste : aucun contour, aucun relief,
 * et un fond identique à celui du dashboard pour une intégration visuelle
 * homogène.
 */

import "../styles/theme-toggle.css";

type ThemeToggleProps = {
  theme: "dark" | "light";
  onToggle: () => void;
};

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <div
      className="theme-toggle-wrapper"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px"
      }}
    >
      <button className="theme-toggle-button" onClick={onToggle}>
        {theme === "dark" ? (
          <>
            <span className="theme-icon">☀️</span>
            <span>Light mode</span>
          </>
        ) : (
          <>
            <span className="theme-icon">🌙</span>
            <span>Dark mode</span>
          </>
        )}
      </button>
    </div>
  );
}


/*

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px"
      }}
    >
      <button onClick={onToggle}>
        {theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
      </button>
    </div>
  );
}
  */