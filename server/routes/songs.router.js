const express = require('express');
const router = express.Router();
//! require in the pg packages
const pool = require('../modules/pool.js')
// const pg = require('pg')


// //! Set up the pool likea  phone

// const pool = new pg.Pool({
//     //* The Name of the Database (not the table)
//     database: 'music_library',
//     //* following will stay the same for local development
//     host: 'localhost',
//     port: 5432

// })

// We will switch from using this Array to using a database.


router.get('/', (req, res) => {

    //QUERY test to send to the database SELECT
    //!Use backticks because they will have single and double quotes included
    //*requires the simicolon. 
    let queryText = `SELECT * FROM "songs";`

    //Use pool to make the transaction with the DB
    pool.query(queryText)
        .then((result) => {
            console.log("result from database", result.rows)
            res.send(result.rows)
            //! result.rows is the ACTUAL data from the results
            console.log("result from database", result.rows)
        })

        .catch((err) => {
            console.error(`Error making query ${queryText}`, err)
            res.send(500)
        })


});

router.post('/', (req, res) => {
    console.log('req.body', req.body);
let song = req.body


//Query Text
// let queryText = 
// `INSERT INTO "songs" ("rank", "track", "artist", "published")
// 	VALUES (600, 'Happy Birthday', 'Mozart', '6-1-1865');`



//! User paramaterization

let songArray = [song.rank, song.track, song.artist, song.published]
let queryText = `INSERT INTO "songs" ("rank", "track", "artist", "published")
VALUES ($1, $2, $3, $4);
`
//use the pool 
pool.query(queryText, songArray)
.then((result) => {
res.sendStatus(201)
})
.catch((err) => {
    console.error(`Error making query ${queryText}`, err)
    res.send(500)
})
    
    
    
    // songs.push(req.body);
    
    
    

});

router.delete('/:id', (req, res) => {
    // NOTE: This route is incomplete.
    console.log('req.params', req.params);
    res.sendStatus(200);
});

module.exports = router;