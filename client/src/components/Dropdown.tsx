import { useState } from "react";


//  FONCTION MENU DEROULEUR HOME PAGE
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>Menu</button>

      {isOpen && (
        <div className="dropdown-menu">
          <a href="#gestion-budget" onClick={() => setIsOpen(false)}>
            Gestion de budget
          </a>
          <a href="#securite" onClick={() => setIsOpen(false)}>
            Sécurité
          </a>
          <a href="#inscription" onClick={() => setIsOpen(false)}>
            Inscription
          </a>
        </div>
      )}
    </div>
  );
}

export default Dropdown;