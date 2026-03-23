import { NavLink } from "react-router-dom";
import crabLogo from "../assets/crab-svgrepo-com.svg";


function Header() {
  return (
    <header>
      <img className="header__logo" src={crabLogo} />
      <nav>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : "pending" }>Dashboard</NavLink>
        <NavLink to="/transactions" className={({ isActive }) => isActive ? "active" : "pending" }>Dépenses</NavLink>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : "pending" }>Home</NavLink>
      </nav>
      <p>Connecté</p>
    </header>
  );
}

export default Header;