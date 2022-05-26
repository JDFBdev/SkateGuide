const express = require('express');
const router = express.Router();
const Tricks = require('../models/tricks')
const {Users} = require('../models/users')

// Get 1 trick from Tricks database. If user is logged in, also get wich stances user have.
router.get('/:id/:username', async (req, res) => {
    let {id, username} = req.params;
    let response = {}
    
    try {
        var trick = await Tricks.findOne({ where: { id } });
        var user = await Users.findOne({ where: { username } })
        if (user) {
            var stances = await user.getStances({where: {trick_id: id}})
        }
    }
    catch(err){
        return res.send({messagge: `Error finding trick`, success: false});
    }

    response.trick = trick;
    if (user) {
        response.stances = {}
        stances?.forEach(stance => {  
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
        res.send(response);
    }
})

module.exports = router;