const express = require('express');
const router = express.Router();
const Tricks = require('../models/tricks')

// Edit 1 trick from the Tricks database
router.post('/', async (req, res) => {
    let {id, propiedad, valor} = req.body;
    try {
        await Tricks.update(
                { [propiedad] : valor},
                { where: { id } }
            )
    }
    catch(err){
        return res.send({message: `Error updating trick`, success: false});
    }
    res.send({message: `Trick updated`, success: true});
})

module.exports = router;