import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import crabLogo from "../assets/crab-svgrepo-com.svg";
import { getMe } from "../services/auth/auth.service";

type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

function Header() {

  const [user, setUser] = useState<UserInfo | undefined>(undefined);

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
      <p className="header__user">{user ? `${user.firstName} ${user.lastName} connecté 🟢` : 'Déconnecté ⚪'}</p>
    </header>
  );
}

export default Header;