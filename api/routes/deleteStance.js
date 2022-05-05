var express = require('express');
var router = express.Router();
const db = require('../db');
const {Users, Stance} = require('../models/users');

router.post('/', async function(req, res) {
    let {username, trick_id, stance} = req.body;
    try {
        const user = await Users.findOne({
            where: {
                username
            }
        })
        const stanceUser = await Stance.findOne({
            where: {
                trick_id,
                stance
            }
        })
        user.removeStance(stanceUser);
        res.send({message: "Stance updated", success: true});
    }
    catch(err){
        res.send({message: "Error updating stance", success: false})
    }
});

module.exports = router;