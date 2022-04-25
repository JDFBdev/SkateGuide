const express = require('express');
const router = express.Router();
const db = require('../db');
const Users = require('../models/users')

router.post('/', async (req, res) => {
    let {username} = req.body;
    try {
        await Users.destroy({ where: { username } });
        res.send(`El Usuario se borro correctamente`);
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
})

module.exports = router;