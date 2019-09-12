const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let querryText = `SELECT * FROM "songs";`;
    pool.query(querryText)
    .then((result)=>{
        // console.log(result.rows);
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

router.put('/rank/:id', (req, res)=>{
    console.log(req.params.id, req.body.direction);
    let songId = req.params.id;
    let direction = req.body.direction;
    let querryText = '';
    if(direction == '+'){
        querryText = `UPDATE "songs" SET "rank" = "rank" + 1 WHERE "id" = $1`;
    } else if (direction == '-'){
        querryText = `UPDATE "songs" SET "rank" = "rank" -1 WHERE "id" = $1`;
    } else {
        res.sendStatus(500);
    }
    pool.query(querryText, [songId]).then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error makig put request', error);
        res.sendStatus(500);
    })
    
})

router.delete('/:id', (req, res)=>{
    console.log('hello from the deleteing', req.params.id);
    let querryText = `DELETE FROM "songs" WHERE "id" = $1;`;
    pool.query(querryText, [req.params.id]).then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log('error', err);
    })

})
module.exports = router;