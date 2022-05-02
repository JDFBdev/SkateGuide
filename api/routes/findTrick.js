const express = require('express');
const router = express.Router();
const db = require('../db');
const Tricks = require('../models/tricks')
const {Users} = require('../models/users')

router.get('/:id/:username', async (req, res) => {
    let {id, username} = req.params;
    let response = {}
    try {
        let trick = await Tricks.findOne({ where: { id } });
        response.trick = trick;
        if (username) {
            const user = await Users.findOne({
                where: {
                    username
                }
            })
            response.stances = []
            await user.getStances({where: {trick_id: id}}).forEach(stance => {
                let objeto = {}
                response.stances.push({
                    stance : stance.stance,
                    learned : true
                })
            });
        }
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
    res.send(response);
})

module.exports = router;