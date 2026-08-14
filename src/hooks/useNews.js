import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

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

        let url;

        if (searchTerm.trim()) {
          const query = encodeURIComponent(searchTerm.trim());

          url =
            `https://gnews.io/api/v4/search` +
            `?q=${query}` +
            `&lang=en` +
            `&country=us` +
            `&max=20` +
            `&apikey=${API_KEY}`;
        } else {
          const selectedCategory =
            category === "all"
              ? "general"
              : category.toLowerCase();

          url =
            `https://gnews.io/api/v4/top-headlines` +
            `?category=${selectedCategory}` +
            `&lang=en` +
            `&country=us` +
            `&max=20` +
            `&apikey=${API_KEY}`;
        }

        // ننتظر ثانية قبل الطلب
        await new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );

        if (cancelled) return;

        let response = await fetch(url);

        // لو حصل 429 نستنى ونحاول مرة تانية
        if (response.status === 429) {
          await new Promise((resolve) =>
            setTimeout(resolve, 3000)
          );

          if (cancelled) return;

          response = await fetch(url);
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.errors?.join(", ") ||
              "Failed to load news"
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