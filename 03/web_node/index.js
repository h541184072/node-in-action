const express = require('express')
const app = express()
// const port = process.env.PORT || 4000
const articles = [{ title: 'Example' }]
const bodyParser = require('body-parser')
const Article = require('./db').Article

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 4001)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err)
    res.send(articles)
  })
})

app.post('/articles', (req, res, next) => {
  console.log(req.body)
  Article.create(req.body, (err) => {
    if (err) return next(err)
    res.send({ message: 'OK' })
  })
})

app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id
  Article.find(id, (err, articles) => {
    if (err) return next(err)
    res.send(articles)
  })
})

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id
  Article.delete(id, (err) => {
    if (err) return next(err)
    res.send({ message: 'Deleted' })
  })
})

// app.listen(port, () => {
//   console.log(`localhost: ${port}`)
// })

app.listen(app.get('port'), () => {
  console.log(`localhost: ${app.get('port')}`)
})