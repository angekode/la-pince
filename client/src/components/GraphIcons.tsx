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
        <img
          src="/icons/graphique-a-barres.png"
          alt="Graphique en barres"
          className="graph-icon-img"
        />
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
        <img
          src="/icons/graphique-lineaire.png"
          alt="Graphique en courbe"
          className="graph-icon-img"
        />
       
      </button>

      {/********************************************************************
       * Icône 3 — Graphique en camembert (Pie Chart)
       ********************************************************************/}
      <button
        className={`graph-icon-btn ${graphType === "pie" ? "active" : ""}`}
        onClick={() => onChange("pie")}
        aria-label="Graphique en camembert"
      >
        <img
          src="/icons/diagramme-circulaire.png"
          alt="Graphique en camembert"
          className="graph-icon-img"
        />
      </button>
    </div>
  );
};

export default GraphIcons;
