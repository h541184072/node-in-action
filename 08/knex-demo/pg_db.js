const knex = require('knex');


const db = knex({
    client: 'pg',
    connection: {
        database: 'articles'
    }
});

module.exports = () => {
    // return db.schema.createTableIfNotExists('articles', table => {
    //     table.increments('id').primary();
    //     table.string('title');
    //     table.text('content');
    // });

    console.log(321)

    // 上面是书里的 下面是新版本的代码优化
    return db.schema.hasTable('articles').then(async exists => {
        if (exists) return
        await db.schema.createTable('articles', table => {
            console.log(6666)
            table.increments('id').primary();
            table.string('title');
            table.text('content');
        })

        console.log(2222)
    })
};

module.exports.Article = {
    all() {
        return db('articles').orderBy('title');
    },

    find(id) {
        return db('articles').where({id}).first();
    },

    create(data) {
        return db('articles').insert(data);
    },

    delete(id) {
        return db('articles').del().where({id});
    }
};
