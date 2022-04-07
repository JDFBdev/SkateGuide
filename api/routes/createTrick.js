const express = require('express');
const router = express.Router();
const db = require('../db');
const Tricks = require('../models/tricks')

router.post('/', async (req, res) => {
    let {id, name, rating, description, video, type} = req.body;

    try {
        let trick = await Tricks.create({
            id,
            name,
            rating,
            description,
            video,
            type
        })
        res.send(`${name} registrado correctamente`);
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
})

module.exports = router;