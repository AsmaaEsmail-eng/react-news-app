export default async function handler(req, res) {
  try {
    const { category = "general", search = "" } = req.query;

    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GNEWS_API_KEY is missing",
      });
    }

    let url;

    if (search.trim()) {
      const query = encodeURIComponent(search.trim());

      url =
        `https://gnews.io/api/v4/search` +
        `?q=${query}` +
        `&lang=en` +
        `&country=us` +
        `&max=10` +
        `&apikey=${apiKey}`;
    } else {
      url =
        `https://gnews.io/api/v4/top-headlines` +
        `?category=${category}` +
        `&lang=en` +
        `&country=us` +
        `&max=10` +
        `&apikey=${apiKey}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.errors?.join(", ") || "GNews API error",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}