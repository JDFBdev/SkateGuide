var express = require('express');
var router = express.Router();
const db = require('../db');
const {Users} = require('../models/users');

router.get('/', async function(req, res){
    try{
        var users = await Users.findAll({
            order: [
                ['points', 'DESC']
            ]
        },
        { limit:10 }
        )
    }
    catch(err){
        res.send({message: "Error retrieving leaderboard", success: false})
    }
    let response = users.map( a => {
        return {
            name: a.username,
            score: a.points
        }
    })
    res.send(response);
});

module.exports = router;
