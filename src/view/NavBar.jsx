import { Link } from "react-router";

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div className="container">
      <Link className="navbar-brand text-light" to="/">Mi App</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link text-light" to="/">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/products">Productos</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;
