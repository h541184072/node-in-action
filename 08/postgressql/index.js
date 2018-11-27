const pg = require('pg')
const db = new pg.Client({database: 'bboo'})
db.connect((err, client) => {
    if (err) throw err
    console.log('Connect', db.database)
    db.end()
})

