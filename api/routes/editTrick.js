const express = require('express');
const router = express.Router();
const db = require('../db');
const Tricks = require('../models/tricks')

router.post('/', async (req, res) => {
    let {id, propiedad, valor} = req.body;
    try {
        let trick = await Tricks.update(
                { [propiedad] : valor},
                { where: { id } }
            )
        res.send(`El truco se edito correctamente`);
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
})

module.exports = router;