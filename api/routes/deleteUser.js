const express = require('express');
const router = express.Router();
const {Users} = require('../models/users')

// delete 1 user from the Users database
router.post('/', async (req, res) => {
    let {username} = req.body;
    try {
        await Users.destroy({ where: { username } });
    }
    catch(err){
        return res.send({message: "Error deleting user", err, success: false})
    }
    res.send({message: `User deleted`, success: true});
})

module.exports = router;