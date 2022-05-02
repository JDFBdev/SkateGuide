var express = require('express');
var router = express.Router();
const db = require('../db');
const {Users, Stance} = require('../models/users');

router.post('/', async function(req, res) {
    let {username, stanceID} = req.body;
    try {
        const user = await Users.findOne({
            where: {
                username
            }
        })
        const stance = await Stance.findOne({
            where: {
                id : stanceID
            }
        })
        user.removeStance(stance);
        res.send("stance borrada correctamente");
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;