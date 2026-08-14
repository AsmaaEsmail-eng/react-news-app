import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/category/technology" className="nav-link">
          Technology
        </Link>

        <Link to="/category/business" className="nav-link">
          Business
        </Link>

        <Link to="/category/sports" className="nav-link">
          Sports
        </Link>

        <Link to="/category/health" className="nav-link">
          Health
        </Link>

        <Link to="/favorites" className="nav-link favorites-link">
          ❤️ Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;