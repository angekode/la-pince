/**************************************************************
 * Composant GraphIcons
 * ------------------------------------------------------------
 * Ce composant affiche trois icônes permettant de sélectionner
 * le type de graphique à afficher dans le dashboard.
 *
 * Les icônes sont :
 *  - un graphique en barres (Bar Chart)
 *  - un graphique en courbe (Curve Chart)
 *  - un graphique en camembert (Pie Chart)
 *
 * Les icônes sont en SVG inline (aucun problème de chemin),
 * stylées via un fichier CSS séparé (graph-icons.css).
 *
 * Props :
 *  - graphType : string → type de graphique actuellement sélectionné
 *  - onChange  : function → callback déclenché lorsqu'on clique une icône
 **************************************************************/

import React from "react";
import "../styles/graph-icons.css"; // Styles dédiés aux icônes

interface GraphIconsProps {
  graphType: "pie" | "bar" | "curve";     // Type de graphique sélectionné
  onChange: (type: "pie" | "bar" | "curve") => void; // Callback lors d'un clic
}

const GraphIcons: React.FC<GraphIconsProps> = ({ graphType, onChange }) => {
  return (
    <div className="graph-icons-container">
      {/********************************************************************
       * Icône 1 — Graphique en barres (Bar Chart)
       ********************************************************************/}
      <button
        className={`graph-icon-btn ${graphType === "bar" ? "active" : ""}`}
        onClick={() => onChange("bar")}
        aria-label="Graphique en barres"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="10" width="4" height="11" rx="1" />
          <rect x="10" y="6" width="4" height="15" rx="1" />
          <rect x="17" y="3" width="4" height="18" rx="1" />
        </svg>
      </button>

      {/********************************************************************
       * Icône 2 — Graphique en courbe (Curve Chart)
       * ------------------------------------------------------------
       * ⚠ IMPORTANT :
       *  - stroke="currentColor" → nécessite un style CSS dédié
       *  - corrigé dans graph-icons.css (fill + stroke)
       ********************************************************************/}
      <button
        className={`graph-icon-btn ${graphType === "curve" ? "active" : ""}`}
        onClick={() => onChange("curve")}
        aria-label="Graphique en courbe"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="4" cy="14" r="2" />
          <circle cx="12" cy="8" r="2" />
          <circle cx="20" cy="12" r="2" />
          <path
            d="M4 14 L12 8 L20 12"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/********************************************************************
       * Icône 3 — Graphique en camembert (Pie Chart)
       ********************************************************************/}
      <button
        className={`graph-icon-btn ${graphType === "pie" ? "active" : ""}`}
        onClick={() => onChange("pie")}
        aria-label="Graphique en camembert"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 2 A10 10 0 1 0 22 13 L11 13 Z" />
          <path d="M12 2 L12 12 L22 12 A10 10 0 0 0 12 2" />
        </svg>
      </button>
    </div>
  );
};

export default GraphIcons;
