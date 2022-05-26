const express = require('express');
const router = express.Router();
const Tricks = require('../models/tricks')

// Delete 1 trick from the Tricks databse
router.post('/', async (req, res) => {
    let {id} = req.body;
    try {
        await Tricks.destroy({ where: { id } });
    }
    catch(err){
        return res.send({message: "Error deleting trick", err, success: false})
    }
    res.send({message: `Trick deleted`, success: true});
})

module.exports = router;