const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
    .then((client) => {
        console.log('Client ready');
        const db = client.db('articles')
        const article = {
            title: 'I like cake',
            content: 'It is quite good.'
        };
        // db.collection('articles')
        //     .insertOne(article)
        //     .then(result => {
        //         console.log(result.insertedId);
        //         console.log(article._id);
        //         client.close();
        //     });

        db.collection('articles')
            .find({title: 'I like cake',})
            .toArray().then(result => {
                console.log(result)
        })
    }, console.error);
