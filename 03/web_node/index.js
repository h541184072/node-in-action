const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Article = require('./db').Article
const read = require('node-readability')

app.set('port', process.env.PORT || 4001)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);

    res.format({
      html: () => {
        res.render('articles.ejs', { articles });
      },
      json: () => {
        res.send(articles);
      }
    });
  });
});

app.post('/articles', (req, res, next) => {
  const url = req.body.url
  read(url, (err, result) => {
    if (err || !result) res.status(500).send('Error downloading article')
    Article.create({
      title: result.title,
      content: result.content
    }, err => {
      if (err) return next(err)
      res.send('Ok')
    })
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

app.listen(app.get('port'), () => {
  console.log(`localhost: ${app.get('port')}`)
})