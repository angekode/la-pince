import crabLogo from "../assets/crab-svgrepo-com.svg";


function Header() {
  return (
    <header>
      <img className="header__logo" src={crabLogo} />
      <h1>La Pince</h1>
      <p>Connecté</p>
    </header>
  );
}

export default Header;