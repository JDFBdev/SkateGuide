const express = require('express');
const router = express.Router();
const db = require('../db');
const Tricks = require('../models/tricks')

router.get('/:id', async (req, res) => {
    let {id} = req.params;
    console.log(id);
    try {
        let trick = await Tricks.findOne({ where: { id } });
        res.send(trick);
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
})

module.exports = router;