import { Handler } from "@netlify/functions";

// Netlify Function: /api/tafseer?surah=1&ayah=1
// Proxies the non-HTTPS Quran Tafseer API so the browser only calls HTTPS endpoints.
const handler: Handler = async (event) => {
  const params = event.queryStringParameters || {};
  const surah = params.surah;
  const ayah = params.ayah;

  if (!surah || !ayah) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'surah' or 'ayah' query params." }),
    };
  }

  try {
    // The original API does not support HTTPS, which causes mixed-content issues on Netlify.
    // We keep the request server-side so the browser communicates over HTTPS only.
    const upstream = `http://api.quran-tafseer.com/tafseer/1/${surah}/${ayah}`;

    const response = await fetch(upstream);
    if (!response.ok) {
      throw new Error(`Upstream error: ${response.status}`);
    }

    const data = await response.json();

    // Return the tafseer JSON with standard caching headers.
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // Cache for 1 hour; adjust as needed.
        "Cache-Control": "public, max-age=3600",
      },
      body: JSON.stringify({ text: data.text }),
    };
  } catch (err: any) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: err.message || "Failed to fetch tafseer." }),
    };
  }
};

export { handler }; 