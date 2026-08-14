export default async function handler(request) {
  try {
    const url = new URL(request.url);

    const category = url.searchParams.get("category") || "general";
    const search = url.searchParams.get("search") || "";

    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "GNEWS_API_KEY is missing",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
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

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}