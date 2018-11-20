const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

// logger

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(router.routes())
app.use(router.allowedMethods())

router.get('/',async (ctx, next) => {
  ctx.body = "Hello"
})

app.listen(3000)