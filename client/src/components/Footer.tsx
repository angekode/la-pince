import { NavLink } from "react-router-dom";


function Footer() {
  return (
  <footer>
    <ul>
      <li><NavLink to="/rgpd">RGPD</NavLink></li>
      <li><a href="">Conditions Générales</a></li>
      <li><a href="">Contacts</a></li>
    </ul>
  </footer>
);
}

export default Footer;