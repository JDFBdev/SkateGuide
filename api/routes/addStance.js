var express = require('express');
var router = express.Router();
const {Users, Stance} = require('../models/users');

// Add 1 Stance to the User
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
        return res.send({message: "Error updating stance", err, success: false})
    }

    try {
        await user.addStance(stanceUser);
        var allStances = await user.getStances()
        allStances.forEach(element => {
            points += element.rating;
        });
        await user.update(
            {points}
        )
    }
    catch(err) {
        return res.send({message: "Error updating user points", err, success: false})
    }

    res.send({message: "Stance updated", success: true});
});

module.exports = router;
