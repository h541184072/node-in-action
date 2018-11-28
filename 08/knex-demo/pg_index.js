const db = require('./pg_db');

db().then(() => {
    console.log('db ready');

    db.Article.create({
        title: 'my article',
        content: 'article content'
    }).then(() => {
        db.Article.all().then(articles => {
            console.log(articles);

            process.exit();
        });
    });
})
    .catch(err => { throw err });
