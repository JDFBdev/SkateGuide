const express = require('express');
const router = express.Router();
const {Stance} = require('../models/users');
const Tricks = require('../models/tricks')

// Add all the stances to the Stances databse at once
router.post('/', async (req, res) => {
    try {
        var tricks = await Tricks.findAll();
    }
    catch(err){
        return res.send({message: "Error finding tricks", err, success: false});
    }
    let stances = ["Regular", "Fakie" , "Nollie", "Switch"];
    let trucosConStances = [];
    tricks.forEach(async (truco) => {
        for(let i=0; i < stances.length ; i++) {
            trucosConStances.push(
                {
                name: truco.name,
                stance: stances[i],
                trick_id: truco.id,
                rating: truco.rating
                }
            )
        }
    });
    await Stance.bulkCreate(trucosConStances, {ignoreDuplicates: true});
    res.send({message: `Stances registered`, success: true});
})

module.exports = router;