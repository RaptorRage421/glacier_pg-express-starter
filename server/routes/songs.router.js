const express = require('express');
const router = express.Router();

// We will switch from using this Array to using a database.
let songs = [
    {
        id: 1,
        rank: 355, 
        artist: 'Ke$ha', 
        track: 'Tik-Toc', 
        published: '1/1/2009'
    },
    {
        id: 2,
        rank: 356, 
        artist: 'Gene Autry', 
        track: 'Rudolph, the Red-Nosed Reindeer', 
        published: '1/1/1949'
    },
    {
        id: 3,
        rank: 357, 
        artist: 'Oasis', 
        track: 'Wonderwall', 
        published: '1/1/1996'
    }
];

router.get('/', (req, res) => {
    res.send(songs);
});

router.post('/', (req, res) => {
    console.log('req.body', req.body);
    songs.push(req.body);
    res.sendStatus(200);
});

router.delete('/:id', (req, res) => {
    // NOTE: This route is incomplete.
    console.log('req.params', req.params);
    res.sendStatus(200);
});

module.exports = router;