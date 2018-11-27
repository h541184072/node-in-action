const pg = require('pg');
const db = new pg.Client({ database: 'bboo' });

db.connect((err, client) => {
    if (err) throw err;
    console.log('Connected to database', db.database);

    const body = 'hello world';
    db.query(`
    INSERT INTO snippets (body) VALUES (
      '${body}'
    )
    RETURNING id
  `, (err, result) => {
        if (err) throw err;
        const id = result.rows[0].id;
        const updatedBody = 'greetings, world';

        console.log('Inserted row with id %s', id);


        // 这个 才是正确的 书里是错误的
        db.query(`
      UPDATE snippets SET body = '${updatedBody}'
      WHERE id=${id};
    `, (err, result) => {
            if (err) throw err;
            console.log('Updated %s rows.', result.rowCount);
            db.end();
        });
    });
});