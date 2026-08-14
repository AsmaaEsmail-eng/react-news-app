import { useParams } from "react-router-dom";

import NewsList from "../components/NewsList";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

import useNews from "../hooks/useNews";

function Category() {
  const { category } = useParams();

  const { articles, loading, error } = useNews(category);

  return (
    <div className="category-page">
      <section className="category-hero">
        <div className="container">
          <span className="section-label">NEWS CATEGORY</span>

          <h1>{category} News</h1>

          <p>
            Explore the latest stories and updates from the{" "}
            {category} section.
          </p>
        </div>
      </section>

      <section className="container category-content">
        {loading && <Loading />}

        {error && <ErrorState message={error} />}

        {!loading && !error && (
          <NewsList articles={articles} />
        )}
      </section>
    </div>
  );
}

export default Category;