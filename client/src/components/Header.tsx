/**
 * ---------------------------------------------------------------------------
 * Header.tsx
 * ---------------------------------------------------------------------------
 * Composant Header UNIQUE utilisé sur toutes les pages :
 *  - Home
 *  - Dashboard
 *  - Dépenses
 *  - Login
 *  - Register
 *
 * Objectifs :
 *  - Fournir une structure commune (logo, navigation, actions utilisateur) et
 *    une navigation cohérente sur tout le site.
 *  - Adapter l’affichage selon la page (home / dashboard / expense).
 *  - Afficher un menu mobile riche sur Home (ancres + navigation).
 *  - Afficher un menu mobile simplifié sur Dashboard/Dépenses.
 *  - Gérer un menu hamburger en mobile pour une navigation unifiée.
 *  - Vérifier si l’utilisateur est connecté via un cookie HTTPOnly sécurisé.
 *
 * Notes importantes :
 *  - Le token d’authentification est stocké dans un cookie HTTPOnly.
 *    → Ce cookie n’est pas accessible en JavaScript (protection XSS).
 *  - Pour vérifier la connexion, on appelle /auth/me.
 *  - Le header est mobile-first : la version mobile est la base.
 *  - Les variations visuelles selon la page sont gérées via des classes CSS :
 *      .header--home
 *      .header--dashboard
 *      .header--expense
 * ---------------------------------------------------------------------------
 */

import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

/* Services internes */
import { getMe } from "../services/auth/auth.service";

/* Composants internes */
import Dropdown from "./Dropdown";
import ThemeToggle from "./ThemeToggle";

/* Assets */
import crabLogo from "../assets/crab-svgrepo-com.svg";

/* Styles */
import "../styles/header.css";

/* ---------------------------------------------------------------------------
 * Typage des données utilisateur renvoyées par /auth/me
 * ------------------------------------------------------------------------- */
type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

function Header() {
  /* -----------------------------------------------------------------------
   * 1. Détection de la page actuelle
   * --------------------------------------------------------------------- */
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === "/";
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isExpense = location.pathname.startsWith("/transactions");

  /* -----------------------------------------------------------------------
   * 2. Vérification de l’authentification + récupération du user
   * --------------------------------------------------------------------- */
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    getMe()
      .then((data) => {
        setIsLogged(true);
        setUser(data); // getMe() doit renvoyer l'objet user
      })
      .catch(() => {
        setIsLogged(false);
        setUser(null);
      });
  }, []);

  /* -----------------------------------------------------------------------
   * 3. Menus mobiles (4 variations)
   * --------------------------------------------------------------------- */

  /** MENU MOBILE — HOME — DÉCONNECTÉ */
  const MenuHomeGuest = () => (
    <>
      <Link to="/login">🟡 Se connecter</Link>
      <Link to="/register">📝 S’inscrire</Link>
      <a href="#visualisation">📌 À propos</a>
      <Link to={isLogged ? "/transactions" : "/dashboard"}>Gestion budget</Link>
      <a href="#securite">🔐 Sécurité</a>
      <Link to="/dashboard">🏠 Dashboard</Link>
      <Link to="/transactions">💸 Dépenses</Link>
    </>
  );

  /** MENU MOBILE — HOME — CONNECTÉ */
  const MenuHomeLogged = () => (
    <>
      <a href="#visualisation">📌 À propos</a>
      <Link to={isLogged ? "/transactions" : "/dashboard"}>Gestion budget</Link>
      <a href="#securite">🔐 Sécurité</a>
      <Link to="/dashboard">🏠 Dashboard</Link>
      <Link to="/transactions">💸 Dépenses</Link>
      <Link to="/logout">🚪 Se déconnecter</Link>
    </>
  );

  /** MENU MOBILE — APP (Dashboard/Dépenses) — DÉCONNECTÉ */
  const MenuAppGuest = () => (
    <>
      <NavLink to="/dashboard">🏠 Dashboard</NavLink>
      <NavLink to="/transactions">💸 Dépenses</NavLink>
      <Link to="/">🏡 Home</Link>
      <Link to="/login">👤 Se connecter</Link>
      <Link to="/register">📝 S’inscrire</Link>
    </>
  );

  /** MENU MOBILE — APP (Dashboard/Dépenses) — CONNECTÉ */
  const MenuAppLogged = () => (
    <>
      <NavLink to="/dashboard">🏠 Dashboard</NavLink>
      <NavLink to="/transactions">💸 Dépenses</NavLink>
      <Link to="/">🏡 Home</Link>
      <Link to="/logout">🚪 Se déconnecter</Link>
    </>
  );

  /* -----------------------------------------------------------------------
   * 4. Rendu principal
   * --------------------------------------------------------------------- */
  return (
    <header
      className={`header ${
        isHome
          ? "header--home"
          : isDashboard
            ? "header--dashboard"
            : "header--expense"
      }`}
    >
      {/* LOGO */}
      <img className="header__logo" src={crabLogo} alt="La Pince logo" />

      {/* MESSAGE UTILISATEUR (mobile + desktop) */}
      <p className="header__user">
        {user ? (
          <>
            Bonjour, <strong>{user.firstName}</strong>{" "}
            <span className="status-dot status-dot--green"></span>
          </>
        ) : (
          <>
            Vous n’êtes pas connecté{" "}
            <span className="status-dot status-dot--red"></span>
          </>
        )}
      </p>

      {/* THEME TOGGLE (visible en mobile et desktop) */}
      <ThemeToggle />

      {/* -------------------------------------------------------------------
         VERSION MOBILE
         ------------------------------------------------------------------- */}
      <div className="header__mobile mobile-only">
        {/* Hamburger */}
        <button
          className="hamburger-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        {/* Menu mobile */}
        <Dropdown open={menuOpen} onToggle={() => setMenuOpen(!menuOpen)}>
          {isHome ? (
            isLogged ? (
              <MenuHomeLogged />
            ) : (
              <MenuHomeGuest />
            )
          ) : isLogged ? (
            <MenuAppLogged />
          ) : (
            <MenuAppGuest />
          )}
        </Dropdown>
      </div>

      {/* -------------------------------------------------------------------
         VERSION DESKTOP
         ------------------------------------------------------------------- */}
      <nav className="header__sections desktop-only">
        {isHome && (
          <>
            <a href="#visualisation">À propos</a>
            <a href="#gestion-budget">Gestion budget</a>
            <a href="#securite">Sécurité</a>
          </>
        )}

        {!isHome && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/transactions">Dépenses</NavLink>
            <Link to="/">Home</Link>
          </>
        )}
      </nav>

      <nav className="header__actions desktop-only">
        {!isLogged && (
          <>
            <Link to="/login">Se connecter</Link>
            <Link to="/register">S’inscrire</Link>
          </>
        )}

        {isLogged && <Link to="/logout">Se déconnecter</Link>}
      </nav>
    </header>
  );
}

export default Header;
