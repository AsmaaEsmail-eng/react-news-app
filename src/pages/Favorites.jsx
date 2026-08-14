import { Link } from "react-router-dom";
import NewsList from "../components/NewsList";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-page">
      <section className="category-hero">
        <div className="container">
          <span className="section-label">YOUR COLLECTION</span>

          <h1>Favorite News</h1>

          <p>
            Keep your favorite stories in one place and read
            them whenever you want.
          </p>
        </div>
      </section>

      <section className="container favorites-content">
        {favorites.length === 0 ? (
          <div className="empty-state">
            <h2>No favorites yet</h2>

            <p>
              You haven't saved any articles yet.
            </p>

            <Link to="/" className="read-more">
              Explore News
            </Link>
          </div>
        ) : (
          <NewsList articles={favorites} />
        )}
      </section>
    </div>
  );
}

export default Favorites;