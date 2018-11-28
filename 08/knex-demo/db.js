const knex = require('knex');

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'tldr.sqlite'
    },
    useNullAsDefault: true
});

module.exports = () => {
    // return db.schema.createTableIfNotExists('articles', table => {
    //     table.increments('id').primary();
    //     table.string('title');
    //     table.text('content');
    // });

    // 上面是书里的 下面是新版本的代码优化
    return db.schema.hasTable('articles').then(exists => {
        if (exists) return
        db.schema.createTable('articles', table => {
            table.increments('id').primary();
            table.string('title');
            table.text('content');
        })
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
