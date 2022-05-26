var express = require('express');
var router = express.Router();
const {Users} = require('../models/users')
const bcrypt = require('bcrypt');

// If an user session (cookie) is active, get it
router.get('/', async function(req, res) {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user});
    } else {
        res.send({ loggedIn: false});
    }
});

// If not user is logged in, checks for a login in the Users database
router.post('/', async function(req, res) {
    let {username, password} = req.body;

    try {
        var user = await Users.findOne({ where : {username}});
        var mail = await Users.findOne({ where : {mail: username}});
    }
    catch(err){
        console.log(err);
    }
    if (user !== null){
        bcrypt.compare(password, user.password, (err, response) => {
            if (response) {
                req.session.user = user;
                res.send({message: `${username} logged in` , success: true, user: user.username});
            } else {
                res.send({message: "Incorrect password", err, success: false});
            }
        });
    } else if (mail !== null){
        bcrypt.compare(password, mail.password, (err, response) => {
            if (response) {
                req.session.user = mail;
                res.send({message: `${username} logged in` , success: true, user: mail.username});
            } else {
                res.send({message: "Incorrect password", err, success: false});
            }
        });
    } else {
        res.send({message: "User not found", success: false});
    } 
});

module.exports = router;
