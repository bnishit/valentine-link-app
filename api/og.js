module.exports = (req, res) => {
  const q = req.query || {};
  const from = String(q.from || 'Rahul').slice(0, 32);
  const to = String(q.to || 'Priya').slice(0, 32);

  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff0f7"/>
      <stop offset="100%" stop-color="#ffe0ef"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="120" r="180" fill="#ffd2e8"/>
  <circle cx="130" cy="80" r="140" fill="#ffe5f2"/>
  <text x="70" y="120" font-family="Arial, sans-serif" font-size="56" font-weight="700" fill="#9f2b68">💘 Valentine Link</text>
  <text x="70" y="250" font-family="Arial, sans-serif" font-size="66" font-weight="800" fill="#4a1f35">${esc(to)}, ${esc(from)}</text>
  <text x="70" y="335" font-family="Arial, sans-serif" font-size="66" font-weight="800" fill="#4a1f35">has something for you 💌</text>
  <text x="70" y="430" font-family="Arial, sans-serif" font-size="38" fill="#7d4b65">Open this and answer 😌</text>
  <text x="70" y="520" font-family="Arial, sans-serif" font-size="30" fill="#b14f7e">Made with mischief and love</text>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).send(svg);
};