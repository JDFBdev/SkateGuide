var express = require('express');
var router = express.Router();
const {Users} = require('../models/users');

// Get 10 users with their point, in descending order
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
        return res.send({message: "Error retrieving leaderboard", success: false})
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
