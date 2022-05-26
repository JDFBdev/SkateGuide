const express = require('express');
const router = express.Router();
const {Users} = require('../models/users')
const bcrypt = require('bcrypt');
const saltRounds = 10;

// changes the password of an user
router.post('/', async (req, res) => {
    let {user, pass} = req.body;
    try {
        bcrypt.hash(pass, saltRounds, (err, hash) => {
            if (err) {
                res.send({message: "Error hashing password", err, success: false})
            }
            Users.update(
                { password : hash },
                { where: { username: user } }
            )
        })
    }
    catch(err){
        return res.send({message: `Error changing password` , err, success: false});
    }
    res.send({message: `Password changed` , success: true});
})

module.exports = router;