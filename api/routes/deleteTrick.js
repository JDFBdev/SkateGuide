const express = require('express');
const router = express.Router();
const db = require('../db');
const Tricks = require('../models/tricks')

router.post('/', async (req, res) => {
    let {id} = req.body;
    try {
        let trick = await Tricks.destroy({ where: { id } })
        .then(() =>res.send(`El truco se borro correctamente`))
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
})

module.exports = router;