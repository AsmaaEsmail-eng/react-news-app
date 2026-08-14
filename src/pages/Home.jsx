import { useState } from "react";
import useNews from "../hooks/useNews";
import NewsList from "../components/NewsList";
import SearchBar from "../components/SearchBar";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    articles,
    loading,
    error,
  } = useNews("all", searchTerm);

  return (
    <main className="home-page">
      <section className="hero">
        <h1>Latest News</h1>

        <p>
          Stay updated with the latest news from around the world.
        </p>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </section>

      {loading && (
        <div className="status-message">
          Loading news...
        </div>
      )}

      {error && (
        <div className="status-message error">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <NewsList articles={articles} />
      )}
    </main>
  );
}

export default Home;