const express = require('express');
const router = express.Router();
const db = require('../db');
const Tricks = require('../models/tricks')
const {Users} = require('../models/users')

router.get('/', async (req, res) => {
    let {id, username} = req.params;
    let response = {}
    try {
        var trick = await Tricks.findOne({ where: { id } });
        var user = await Users.findOne({ where: { username } })
        var stances = await user.getStances({where: {trick_id: id}})
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
    response.trick = trick;
    if (username) {
        response.stances = {}
        stances.forEach(stance => {  
            response.stances[stance.dataValues.stance] = true;
        });
        if (!response.stances.hasOwnProperty('Regular')) {
            response.stances.Regular = false;
        }
        if (!response.stances.hasOwnProperty('Fakie')) {
            response.stances.Fakie = false;
        }
        if (!response.stances.hasOwnProperty('Nollie')) {
            response.stances.Nollie = false;
        }
        if (!response.stances.hasOwnProperty('Switch')) {
            response.stances.Switch = false;
        }
    }
    res.send(response);
})

module.exports = router;