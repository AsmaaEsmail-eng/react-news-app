export default async function handler(req, res) {
  try {
    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GNEWS_API_KEY is missing",
      });
    }

    const category = req.query.category || "general";
    const search = req.query.search || "";

    const params = new URLSearchParams({
      lang: "en",
      country: "us",
      max: "10",
      apikey: apiKey,
    });

    let endpoint;

    if (search.trim()) {
      endpoint = "search";
      params.set("q", search.trim());
    } else {
      endpoint = "top-headlines";
      params.set(
        "category",
        category === "all" ? "general" : category.toLowerCase()
      );
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 8000);

    const response = await fetch(
      `https://gnews.io/api/v4/${endpoint}?${params.toString()}`,
      {
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data.errors?.join(", ") ||
          "GNews API error",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error:
        error.name === "AbortError"
          ? "GNews request timed out"
          : error.message,
    });
  }
}