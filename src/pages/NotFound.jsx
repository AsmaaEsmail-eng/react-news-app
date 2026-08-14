import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="container not-found">
      <div className="not-found-content">
        <span className="error-number">404</span>

        <h1>Page Not Found</h1>

        <p>
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;