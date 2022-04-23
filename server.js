require('dotenv').config()
const express = require('express')
const passport = require('passport')
let fsp = require('fs/promises')
let path = require('path')
const cors = require('cors')

require('./src/server/config/db')
require('./src/server/schemas/User')
require('./src/server/config/passport')(passport)

const PORT = process.env.PORT || 3000
let root = process.cwd()
let isProduction = process.env.NODE_ENV === 'production'

function resolve(p) {
  return path.resolve(__dirname, p)
}

async function createServer() {
  let app = express()
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite

  if (!isProduction) {
    vite = await require('vite').createServer({
      root,
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
      },
    })

    app.use(vite.middlewares)
  } else {
    app.use(require('compression')())
    app.use(express.static(resolve('dist/client')))
  }

  // This will initialize the passport object on every request
  app.use(passport.initialize())

  // Client body parser
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  // Headers setup for local development
  app.use(cors())

  app.use(require('./src/server/routes/index'))

  app.use('*', async (req, res) => {
    let url = req.originalUrl

    try {
      let template
      let render

      if (!isProduction) {
        template = await fsp.readFile(resolve('./index.html'), 'utf8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('./src/main.server.tsx')).render
      } else {
        template = await fsp.readFile(resolve('dist/client/index.html'), 'utf8')
        render = require(resolve('dist/server/main.server.js')).render
      }

      let html = template.replace('<!--app-html-->', render(url))
      res.setHeader('Content-Type', 'text/html')
      return res.status(200).end(html)
    } catch (error) {
      if (!isProduction) {
        vite.ssrFixStacktrace(error)
      }
      console.log(error.stack)
      res.status(500).end(error.stack)
    }
  })

  return app
}

createServer().then((app) => {
  app.listen(PORT, (err) => {
    if (err) throw err
    else console.log(`HTTP server is running at ${PORT}`)
  })
})
