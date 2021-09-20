
module.exports = async function(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=604800, max-age=604800')
  res.end(`<h1>${process.env.VITE_MSG} vercel dev</h1>`)
}
