var express = require('express');
var router = express.Router();
const db = require('../db');
const {Users, Stance} = require('../models/users');

router.post('/', async function(req, res) {
    let {username, trick_id, stance} = req.body;
    let points = 0;

    try {
        var user = await Users.findOne({
            where: {
                username
            }
        })
        var stanceUser = await Stance.findOne({
            where: {
                trick_id,
                stance
            }
        })
    }
    catch(err){
        res.send({message: "Error updating stance", success: false})
    }

    await user.addStance(stanceUser);

    try {
        var allStances = await user.getStances()
        allStances.forEach(element => {
            points += element.rating;
        });
    }
    catch(err) {
        res.send({message: "Error updating user points", success: false})
    }

    await user.update(
        {points}
    )

    res.send({message: "Stance updated", success: true});
});

module.exports = router;
