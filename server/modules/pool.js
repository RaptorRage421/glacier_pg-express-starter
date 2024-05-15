const pg = require('pg')


//! Set up the pool likea  phone

const pool = new pg.Pool({
    //* The Name of the Database (not the table)
    database: 'music_library',
    //* following will stay the same for local development
    host: 'localhost',
    port: 5432

})

module.exports = pool




