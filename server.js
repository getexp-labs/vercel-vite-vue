const fs = require('fs')
const path = require('path')
const express = require('express')
const { createServer } = require('vite')
require('dotenv').config()

const PORT = process.env.PORT || 8080

async function init() {
  const app = express()

  const vite = await createServer({
    server: { middlewareMode: 'html' },
  })

  // Add all serverless functions
  // TODO: migrate to import.meta.globEager('./api/*.js')).map(i => app.use(`/api/${i}`, i))
  const normalizedPath = path.join(__dirname, 'api')
  fs.readdirSync(normalizedPath).forEach(function(file) {
    const [routePath, fileExtension] = file.split('.')
    if (fileExtension === 'js') app.use(`/api/${routePath}`, require(`./api/${file}`))
  })

  // Use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`)
  })
}

init()
