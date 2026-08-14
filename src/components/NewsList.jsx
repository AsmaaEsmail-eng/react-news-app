import NewsCard from "./NewsCard";

function NewsList({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="empty-state">
        <h2>No news found</h2>
        <p>Try searching for another topic.</p>
      </div>
    );
  }

  return (
    <section className="news-list">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </section>
  );
}

export default NewsList;