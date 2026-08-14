import { useEffect, useState } from "react";

function useNews(category = "all", searchTerm = "") {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const selectedCategory =
          category === "all"
            ? "general"
            : category.toLowerCase();

        const params = new URLSearchParams();

        if (searchTerm.trim()) {
          params.append("search", searchTerm.trim());
        } else {
          params.append("category", selectedCategory);
        }

        await new Promise((resolve) =>
          setTimeout(resolve, 500)
        );

        if (cancelled) return;

        const response = await fetch(
          `/api/news?${params.toString()}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to load news"
          );
        }

        const formattedArticles =
          (data.articles || []).map(
            (article, index) => ({
              id: `${index}-${article.publishedAt}`,

              title: article.title,

              description:
                article.description ||
                "No description available.",

              content:
                article.content ||
                article.description ||
                "No content available.",

              image:
                article.image ||
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",

              author:
                article.source?.name ||
                "Unknown",

              source:
                article.source?.name ||
                "GNews",

              date: article.publishedAt
                ? new Date(
                    article.publishedAt
                  ).toLocaleDateString()
                : "Unknown date",

              category:
                category === "all"
                  ? "General"
                  : category,

              url: article.url,
            })
          );

        if (!cancelled) {
          setArticles(formattedArticles);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setArticles([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      cancelled = true;
    };
  }, [category, searchTerm]);

  return {
    articles,
    loading,
    error,
  };
}

export default useNews;