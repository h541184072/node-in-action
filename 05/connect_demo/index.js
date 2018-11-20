const app = require('connect')()
const setUp = require('./logger')
// function logger(req, res, next) {
//   console.log(111)
//   next()
// }

function hello(req, res, next) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello')
}

app.use(setUp(':method :url'))
// app.use(logger)
app.use(hello)

app.listen(3000)