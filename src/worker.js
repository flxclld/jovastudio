const UPSTREAM_ORIGIN = "https://jovastudio.framer.website";

const HTML_HEADERS = {
  "cache-control": "public, max-age=60, s-maxage=300",
  "content-type": "text/html; charset=utf-8",
};

export default {
  async fetch(request) {
    const requestUrl = new URL(request.url);
    const upstreamUrl = new URL(requestUrl.pathname + requestUrl.search, UPSTREAM_ORIGIN);

    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        "accept": request.headers.get("accept") || "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": request.headers.get("accept-language") || "en-US,en;q=0.9",
        "user-agent": request.headers.get("user-agent") || "Mozilla/5.0",
      },
      redirect: "follow",
    });

    const contentType = upstreamResponse.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return withCleanHeaders(upstreamResponse);
    }

    let html = await upstreamResponse.text();
    html = removeFramerBadge(html);
    html = rewriteSiteUrls(html, requestUrl.origin);

    return new Response(html, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: HTML_HEADERS,
    });
  },
};

function removeFramerBadge(html) {
  return html
    .replace(/<!-- Made in Framer[^>]*-->/g, "")
    .replace(/<meta name="generator" content="Framer[^"]*">/g, "")
    .replace(/<div id="__framer-badge-container">[\s\S]*?<\/div>\s*<script data-framer-appear-animation/g, "<script data-framer-appear-animation")
    .replace(/#__framer-badge-container\{[^}]*\}/g, "")
    .replace(/@supports \(z-index:calc\(infinity\)\)\{#__framer-badge-container\{[^}]*\}\}/g, "");
}

function rewriteSiteUrls(html, origin) {
  return html
    .replace(/https:\/\/jovastudio\.framer\.website/g, origin)
    .replace(/<link rel="canonical" href="[^"]*">/g, `<link rel="canonical" href="${origin}/">`)
    .replace(/<meta property="og:url" content="[^"]*">/g, `<meta property="og:url" content="${origin}/">`);
}

function withCleanHeaders(response) {
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.set("access-control-allow-origin", "*");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
