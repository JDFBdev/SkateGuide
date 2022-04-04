const express = require('express');
const router = express.Router();
const db = require('../db');
const Tricks = require('../models/tricks')

// Get all tricks
router.get('/', async (req, res) => {
    let tricks = await Tricks.findAll();
    if (tricks) {
        res.send(tricks);
    } else {
        res.send("Error");
    }
})

// Add trick
router.get("/add", (req, res) => {
    const data = {
        id: 1,
        name: 'Ollie',
        rating: 1,
        description: 'Poping your skateboard off the ground.',
        video: 'https://www.youtube.com/embed/VasSLuFO4wY',
        type: 'Street'
    }

    let {id, name, rating, description, video, type} = data;

    Tricks.create({
        id,
        name,
        rating,
        description,
        video,
        type
    })
    .then(trick => res.redirect('/tricks'))
    .catch(err => console.log(err));
});

module.exports = router;