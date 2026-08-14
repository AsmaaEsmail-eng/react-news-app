export default async function handler(req, res) {
  try {
    const { category = "general", search = "" } = req.query;

    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GNEWS_API_KEY is missing",
      });
    }

    const endpoint = search.trim()
      ? "search"
      : "top-headlines";

    const params = new URLSearchParams({
      lang: "en",
      country: "us",
      max: "10",
      apikey: apiKey,
    });

    if (search.trim()) {
      params.set("q", search.trim());
    } else {
      params.set(
        "category",
        category === "all"
          ? "general"
          : category.toLowerCase()
      );
    }

    const response = await fetch(
      `https://gnews.io/api/v4/${endpoint}?${params.toString()}`
    );

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
      error: error.message,
    });
  }
}