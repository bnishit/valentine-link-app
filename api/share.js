module.exports = (req, res) => {
  const q = req.query || {};
  const from = String(q.from || 'Rahul').slice(0, 40);
  const to = String(q.to || 'Priya').slice(0, 40);
  const theme = String(q.theme || 'cute').slice(0, 20);
  const tone = String(q.tone || 'classic').slice(0, 20);
  const hook = String(q.hook || 'cute').slice(0, 20);
  const lid = String(q.lid || '').slice(0, 40);

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const origin = `${proto}://${host}`;

  const askUrl = `${origin}/ask?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&theme=${encodeURIComponent(theme)}&tone=${encodeURIComponent(tone)}&hook=${encodeURIComponent(hook)}&lid=${encodeURIComponent(lid)}`;
  const cacheKey = encodeURIComponent(lid || Date.now().toString(36));
  const ogText = encodeURIComponent(`${to}, ${from} has something for you`);
  // WhatsApp is much more reliable with PNG/JPG than SVG OG images.
  const imageUrl = `https://dummyimage.com/1200x630/ffe3f1/4a1f35.png&text=${ogText}%20%F0%9F%92%8C&v=${cacheKey}`;

  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(to)}, ${esc(from)} has something for you 💌</title>
  <meta property="og:title" content="${esc(to)}, ${esc(from)} has something for you 💌" />
  <meta property="og:description" content="Open this and answer the cutest question 😌" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:type" content="website" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content="${esc(to)}, ${esc(from)} has something for you 💌" />
  <meta property="twitter:description" content="Open this and answer the cutest question 😌" />
  <meta property="twitter:image" content="${imageUrl}" />
  <meta http-equiv="refresh" content="0; url=${askUrl}" />
  <script>location.replace(${JSON.stringify(askUrl)});</script>
</head>
<body style="font-family:Arial,sans-serif;padding:20px">Redirecting… <a href="${askUrl}">continue</a></body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=120');
  res.status(200).send(html);
};