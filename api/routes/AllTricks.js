const express = require('express');
const router = express.Router();
const Tricks = require('../models/tricks')

// Get all tricks in the Tricks database
router.get('/', async (req, res) => {
    try {
        var tricks = await Tricks.findAll();
    }
    catch(err) {
        return res.send({message: "Error finding tricks", err, success: false})
    }
    res.send(tricks);
})

module.exports = router;