/**
 * Dropdown.tsx
 * ---------------------------------------------------------------------------
 * Composant générique pour afficher un menu déroulant en mobile.
 * Il reçoit son contenu via props.children (permet au Header de contrôler
 * totalement le contenu du menu selon la page et l’état de connexion).
 * Menu déroulant mobile contrôlé par le Header.
 * Le Header déclenche l’ouverture via la prop "open" et "onToggle".
 * ---------------------------------------------------------------------------
 */

import "../styles/dropdown.css";

type DropdownProps = {
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export default function Dropdown({ open, onToggle, children }: DropdownProps) {
  return (
    <div className="dropdown">
      {/* Le bouton hamburger est dans Header.tsx → ici on ne met rien */}

      {open && (
        <div className="dropdown-menu">
          {children}
        </div>
      )}
    </div>
  );
}
