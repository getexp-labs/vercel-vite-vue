const axios = require('axios')
const sharp = require('sharp')

module.exports = async function(req, res) {
  const {
    query: { url, w, h, q },
  } = req
  try {
    if (!url) throw new Error('No url!')

    const buffer = (await axios({ url, responseType: 'arraybuffer' })).data

    const new_params = {
      w: +w || 800, // set default 800px
      h: +h || null, // set to null if not provided, so that Sharp automatically keep the aspect ratio
      q: +q || 80, // set default 80% quality
    }

    // Transformation happens
    sharp(buffer)
      .resize(new_params.w, new_params.h)
      .jpeg({ quality: new_params.q }) // change to .webp() if you want to serve as webp
      // .webp({ reductionEffort: 6 })
      .toBuffer()
      .then((data) => {
        // here's where set the cache
        // I set to cache the media for 1 week, 60seconds * 60minutes * 24hours * 7days
        // remove setHeader('Cache-Control') if you wish not to cache it
        res.statusCode = 200
        res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=604800, max-age=604800')
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      })
  }
  catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end(`<h1>Internal Error</h1><p>${e.toString()}</p>`)
  }
  
  

  

  
  // else {
  //   res.statusCode = 500
  //   res.setHeader('Content-Type', 'text/html')
  //   res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
  // }
}
