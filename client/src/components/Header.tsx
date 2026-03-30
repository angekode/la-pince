import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import crabLogo from "../assets/crab-svgrepo-com.svg";
import { getMe } from "../services/auth/auth.service";
import ThemeToggle from "./ThemeToggle";
import "../styles/header.css";

type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

function toggleTheme() {
  setTheme(theme === "light" ? "dark" : "light");
  document.body.className = theme === "light" ? "dark" : "light";
}


  // undefined => utilisateur déconnecté, sinon contient les infos de l'utilisateur
  const [user, setUser] = useState<UserInfo | undefined>(undefined);

  // Se lance une fois au montage du composant pour récupérer les infos de l'utilisateur.
  // Si connecté => affiche le nom
  // Sinon affiche déconnecté
  useEffect(() => {
    getMe().then(value => setUser(value));
  },[]);

  return (
    <header>
      <img className="header__logo" src={crabLogo} />
      <nav>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : "pending" }>Dashboard</NavLink>
        <NavLink to="/transactions" className={({ isActive }) => isActive ? "active" : "pending" }>Dépenses</NavLink>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : "pending" }>Home</NavLink>
      </nav>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <p className="header__user">{user ? ( <>Bonjour, <strong>{user.firstName}</strong> 🟢</>
    ) : ( 
    <>Vous n’êtes pas connecté <span className="status-dot status-dot--red"></span></>)}</p>

    
    </header>
  );
}

export default Header;