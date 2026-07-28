const UPSTREAM_ORIGIN = "https://jovastudio.framer.website";

const HTML_HEADERS = {
  "cache-control": "public, max-age=30, s-maxage=60",
  "content-type": "text/html; charset=utf-8",
};

const HERO_LOGO_CSS = String.raw`
<style id="jova-hero-logo-edge-css">
  [data-framer-name="HERO"] [data-framer-name="JOVA STUDIO TEXT"] {
    left: 0 !important;
    right: 0 !important;
    width: 100vw !important;
    max-width: 100vw !important;
    margin-left: calc(50% - 50vw) !important;
    margin-right: calc(50% - 50vw) !important;
    transform: none !important;
  }

  [data-framer-name="HERO"] [data-framer-name="JOVA STUDIO TEXT"] [data-framer-name="TEXTO"] {
    left: 0 !important;
    right: 0 !important;
    width: 100vw !important;
    max-width: 100vw !important;
    transform: none !important;
  }

  [data-framer-name="HERO"] [data-framer-name="JOVA STUDIO TEXT"] .framer-16w1awz {
    left: 0 !important;
    right: 0 !important;
    width: 100vw !important;
    max-width: 100vw !important;
    height: auto !important;
    transform: none !important;
  }

  [data-framer-name="HERO"] [data-framer-name="JOVA STUDIO TEXT"] img[src*="e9AIuwQcnnmWQ8GSiy0aZDHh5ro"],
  [data-framer-name="HERO"] [data-framer-name="JOVA STUDIO TEXT"] img[src*="CMhF3QSrAr8RX17PCPK0zHPBEyw"] {
    width: 100vw !important;
    max-width: 100vw !important;
    height: auto !important;
    object-fit: contain !important;
    object-position: center bottom !important;
  }

  @media (max-width: 809.98px) {
    [data-framer-name="HERO"] [data-framer-name="JOVA STUDIO TEXT"],
    [data-framer-name="HERO"] [data-framer-name="JOVA STUDIO TEXT"] [data-framer-name="TEXTO"],
    [data-framer-name="HERO"] [data-framer-name="JOVA STUDIO TEXT"] .framer-16w1awz {
      width: 100vw !important;
      max-width: 100vw !important;
      min-width: 100vw !important;
    }
  }
</style>`;

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
    html = injectHeroLogoCss(html);

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

function injectHeroLogoCss(html) {
  if (html.includes('id="jova-hero-logo-edge-css"')) {
    return html;
  }

  if (html.includes("</head>")) {
    return html.replace("</head>", `${HERO_LOGO_CSS}</head>`);
  }

  return `${HERO_LOGO_CSS}${html}`;
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
