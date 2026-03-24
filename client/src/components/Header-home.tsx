import crabLogo from "../assets/crab-svgrepo-com.svg";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import "../styles/header-home.css";

function Header() {
  return (
    <header className="home-header">
      {/* Logo */}
      <img
        className="home-header__logo"
        src={crabLogo}
        alt="La Pince logo"
      />

      {/* Menu */}
      <div className="home-header__menu">
        <Dropdown />
      </div>

      {/* Liens à droite */}
      <nav className="home-header__nav">
        <Link to="/register">S'inscrire</Link>
        <Link to="/login">Connexion</Link>
      </nav>
    </header>
  );
}

export default Header;