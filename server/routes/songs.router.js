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
    let queryText = `SELECT * FROM "songs" ORDER BY "rank" ASC;`

    //Use pool to make the transaction with the DB
    pool.query(queryText)
        .then((result) => {
            // console.log("result from database", result.rows)
            res.send(result.rows)
            //! result.rows is the ACTUAL data from the results
            // console.log("result from database", result.rows)
        })

        .catch((err) => {
            console.error(`Error making query ${queryText}`, err)
            res.send(500)
        })


});

// GET A SONG FROM DB, BY ID
// the URL itself will be used to hold a small bit of data ${param}
router.get('/getSongById/:id', (req, res) => {
    //!access parameters from the url
    const incId = req.params.id
    console.log("incoming ID", incId)

    queryText = `SELECT * FROM "songs"
    WHERE "id" = $1;`

    //!Make Parameters into ARRAY
    let idToFind = [incId]
    pool.query(queryText, idToFind)
        .then((result) => {
            // console.log("Result rows from DB", result.rows)
            res.send(result.rows)
        })
        .catch((err) => {
            console.error(`error grabbing query ${queryText}`, err)
            res.send(500)
        })

})

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
    console.log('req.params.id', req.params.id);


    let queryText = `DELETE FROM "songs" WHERE "id" = $1;`
    let reqId = [req.params.id]
    pool.query(queryText, reqId)
        .then((result) => {
            res.sendStatus(200)
            console.log("successfull deleted", reqId)
        })
        .catch((err) => {
            console.error(`Error making query ${queryText}`, err)
            res.send(500)
        })

});



//ADDING A CHANGE SUPRISE!

router.put('/rank/:id', (req, res) => {
    let songId = req.params.id
    let direction = req.body.direction

    console.log('changing rank of song id: ', songId, "in direction: ", direction)
    let queryText = ''
    if (direction === 'up') {
        queryText = `UPDATE "songs" SET "rank"=rank-1
WHERE "id"=$1;`
    } else if (direction === 'down') {
        queryText = `UPDATE "songs" SET "rank"=rank+1
    WHERE "id"=$1;`
    } else {
        // ! if neither send an error
        res.sendStatus(500)
    }
    pool.query(queryText, [songId])
        .then((result) => {
            res.sendStatus(204)
        })
        .catch((err) => {
            console.error(`Error making query ${queryText}`, err)
            res.send(500)
        })



})





module.exports = router;


