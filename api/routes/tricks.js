const express = require('express');
const router = express.Router();
const db = require('../db');
const Tricks = require('../models/tricks')

router.get('/', (req, res) => 
    Tricks.findAll()
        .then(tricks => {
            console.log(tricks);
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
    );

module.exports = router;