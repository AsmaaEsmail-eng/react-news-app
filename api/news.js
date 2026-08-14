export default async function handler(request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") || "general";
    const search = searchParams.get("search") || "";

    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "GNEWS_API_KEY is missing" },
        { status: 500 }
      );
    }

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

    const response = await fetch(
      `https://gnews.io/api/v4/${endpoint}?${params.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          error:
            data.errors?.join(", ") ||
            "GNews API error",
        },
        { status: response.status }
      );
    }

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}