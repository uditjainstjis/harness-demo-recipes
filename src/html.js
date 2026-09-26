'use strict';

/** Escape text so it can be placed inside HTML. */
function escapeHtml(text) {
  return String(text).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
}

function layout(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} · Recipe Box</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header>
    <a class="brand" href="/">🍲 Recipe Box</a>
    <form class="search" action="/search" method="get">
      <input type="search" name="q" placeholder="Search recipes">
      <button>Search</button>
    </form>
  </header>
  <main>
${body}
  </main>
  <footer>Recipe Box · a tiny demo site</footer>
</body>
</html>`;
}

module.exports = { escapeHtml, layout };
