const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let querryText = `SELECT * FROM "songs";`;
    pool.query(querryText)
    .then((result)=>{
        res.send(result.rows);
    }).catch((err)=>{
        console.log('error making query: ', err);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    console.log("HELLO FROM THE POST", req.body);
    const newSong = req.body;
    const querryText = `INSERT INTO "songs" ("rank", "artist", "track", "published")
    VALUES($1, $2, $3, $4);`
    pool.query(querryText, [newSong.rank, newSong.artist, newSong.track, newSong.published])
    .then((result)=>{
        console.log('post result', result);
        res.sendStatus(201);
    }).catch((error)=>{
        console.log(`error makig query${querryText}`, error);
    })
})


router.delete('/:id', (req, res)=>{
    console.log('hello from the deleteing', req.params.id);
    let querryText = `DELETE FROM "songs" WHERE "id" = $1;`;
    pool.query(querryText, [req.params.id]).then((result)=>{
        console.log(result);
        res.sendStatus(200);
    }).catch((err)=>{
        console.log('error', err);
    })

})
module.exports = router;