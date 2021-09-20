
module.exports = async function(req, res) {
  res.statusCode = 200
  res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=604800, max-age=604800')
  res.json(
    [
      {id: 1, color: 'red'},
      {id: 2, color: 'green'},
      {id: 3, color: 'blue'}
    ]
  )
}
