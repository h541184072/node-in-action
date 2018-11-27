const pg = require('pg');
const db = new pg.Client({ database: 'bboo' });

db.connect((err, client) => {
    if (err) throw err;
    console.log('Connected to database', db.database);

    db.query(`
    SELECT * FROM snippets ORDER BY id
  `, (err, result) => {
        if (err) throw err;
        console.log(result.rows);
        db.end();
    });
});