const express = require('express');
const router = express.Router();
const db = require('../db');
const Tricks = require('../models/tricks')

router.get('/', async (req, res) => {
    let tricks = await Tricks.findAll();
    if (tricks) {
        res.send(tricks);
    } else {
        res.send("Error");
    }
})

module.exports = router;