const Koa = require('koa')
const consola = require('consola')
const send = require('koa-send')
const Router = require('koa-router')
const cors = require('@koa/cors')

const config = require('../config')
const { render } = require('./frontend')

const app = new Koa()
const router = new Router()

const host = config.HOST
const port = config.PORT

app.use(cors({ origin: `${host}` }))

router.get(`/${process.env.MXIMGPATH}/*`, async ctx => {
  await send(ctx, `static/editor/${ctx.path}`)
})

router.get('*', render)
app.use(router.routes())

app.listen(port)
consola.ready({
  message: `Server listening on ${host}:${port}`,
  badge: true
})

module.exports = app
