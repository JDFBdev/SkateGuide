const express = require('express');
const router = express.Router();
const Tricks = require('../models/tricks')

// Add 1 trick to the Tricks databse
router.post('/', async (req, res) => {
    let {id, name, rating, description, video, type} = req.body;
    try {
        await Tricks.create({
            id,
            name,
            rating,
            description,
            video,
            type
        })
    }
    catch(err){
        return res.send({message: "Error adding trick", err, success: false})
    }
    res.send({message: `${name} added`, success: true});
})

module.exports = router;