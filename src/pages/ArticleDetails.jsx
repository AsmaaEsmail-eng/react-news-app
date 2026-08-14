import { Link, useLocation } from "react-router-dom";

function ArticleDetails() {
  const location = useLocation();

  const article = location.state?.article;

  if (!article) {
    return (
      <section className="not-found">
        <h1>Article Not Found</h1>

        <p>
          This article could not be found.
        </p>

        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <article className="article-details">

      <div className="container">

        <Link to="/" className="back-link">
          ← Back to News
        </Link>

        <div className="article-header">

          <span className="news-category">
            {article.category}
          </span>

          <h1>{article.title}</h1>

          <div className="article-meta">
            <span>
              {article.source}
            </span>

            <span>
              {article.date}
            </span>
          </div>

        </div>

        <img
          src={article.image}
          alt={article.title}
          className="article-main-image"
        />

        <div className="article-body">

          <p className="article-description">
            {article.description}
          </p>

          <p>
            {article.content}
          </p>

          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more"
            >
              Read Full Article →
            </a>
          )}

        </div>

      </div>

    </article>
  );
}

export default ArticleDetails;