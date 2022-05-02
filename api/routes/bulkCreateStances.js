const express = require('express');
const router = express.Router();
const db = require('../db');
const {Stance} = require('../models/users');
const Tricks = require('../models/tricks')

router.post('/', async (req, res) => {
    try {
        var tricks = await Tricks.findAll();
    }
    catch(err){
        console.log(err);
    }
        let stances = ["Regular", "Fakie" , "Nollie", "Switch"];
        let trucosConStances = [];
        tricks.forEach(async (truco) => {
            for(let i=0; i < stances.length ; i++) {
                trucosConStances.push(
                    {
                    name: truco.name,
                    stance: stances[i],
                    trick_id: truco.id
                    }
                )
            }
        });
        await Stance.bulkCreate(trucosConStances, {ignoreDuplicates: true});
        res.send(`Trucos con stances registrados correctamente`);
})

module.exports = router;
