import crabLogo from "../assets/crab-svgrepo-com.svg";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMe } from "../services/auth/auth.service";
import "../styles/header-home.css";

function HeaderHome() {

    //  VERIFICATION SI LE USER EST LOG OU PAS 
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
      getMe()
        .then(() => setIsLogged(true))
        .catch(() => setIsLogged(false));
    }, []);

  return (
    <header className="home-header">
      {/* Logo */}
      <img
        className="home-header__logo"
        src={crabLogo}
        alt="La Pince logo"
      />

      {/* Menu MOBILE*/}
      <div className="home-header__menu">
        <Dropdown />
      </div>

      {/* Menu Desktop */}
      <nav className="home-header__sections desktop-only">
        <a href="#visualisation">À propos</a>
        <a href="#gestion-budget">Gestion de budget</a>
        <a href="#securite">Sécurité</a>
        <a href="#securite">Inscription</a>
      </nav>

      {/* Liens à droite */}
      <nav className="home-header__nav">
        <Link to="/register">S'inscrire</Link>

        {/* REDIRECTION VERS LA BONNE PAGE SELON LE STATUT LOG */}
        <Link to={isLogged ? "/dashboard" : "/login"}>Connexion</Link>
      </nav>
    </header>
  );
}

export default HeaderHome;