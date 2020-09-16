const express = require('express')()
const Next = require('next')

const dev = process.env.NODE_ENV !== 'production'

const config = require('./config')

express.use(require('body-parser').urlencoded({ extended: true }))

/* NextJS handler START */

const app = Next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    if (dev) {
      express.get('/_next/*', (req, res) =>
        handle(req, res).then(() => {
          res.sent = true
        })
      )
    }

    express.all('/api/*', (req, res) =>
      handle(req, res).then(() => {
        res.sent = true
      })
    )

    express.all('/*', (req, res) => {
      return handle(req, res).then(() => {
        res.sent = true
      })
    })
  })
  .catch((err) => console.log(err))

/* NextJS handler END */

express.listen(config.port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${config.port}`)
})
