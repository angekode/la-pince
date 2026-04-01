import { NavLink } from "react-router-dom";


function Footer() {
  return (
  <footer>
    <ul>
      <li><NavLink to="/rgpd">RGPD</NavLink></li>
      <li><NavLink to="/legal">Mentions Légales</NavLink></li>
      <li><NavLink to="/conditions">Conditions Générales</NavLink></li>
    </ul>
  </footer>
);
}

export default Footer;