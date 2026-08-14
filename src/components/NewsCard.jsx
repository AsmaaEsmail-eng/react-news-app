import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function NewsCard({ article }) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some(
    (favorite) => favorite.id === article.id
  );

  return (
    <article className="news-card">
      <img
        src={article.image}
        alt={article.title}
        className="news-image"
      />

      <div className="news-content">
        <span className="news-category">
          {article.category}
        </span>

        <h2>{article.title}</h2>

        <p>
          {article.description}
        </p>

        <div className="news-meta">
          <span>{article.source}</span>
          <span>{article.date}</span>
        </div>

        <div className="card-actions">
          <Link
            to={`/article/${article.id}`}
            state={{ article }}
            className="read-more"
          >
            Read More →
          </Link>

          <button
            className={`favorite-button ${
              isFavorite ? "favorite-active" : ""
            }`}
            onClick={() => toggleFavorite(article)}
          >
            {isFavorite ? "❤️ Saved" : "♡ Save"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;