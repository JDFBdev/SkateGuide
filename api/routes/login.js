var express = require('express');
var router = express.Router();
const {Users} = require('../models/users')
const bcrypt = require('bcrypt');

router.get('/', async function(req, res) {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user});
    } else {
        res.send({ loggedIn: false});
    }
});

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
        bcrypt.compare(password, user.password, (error, response) => {
            if (response) {
                req.session.user = user;
                res.send({message: `${username} logeado` , success: true, user: user.username});
            } else {
                res.send({message: "Contraseña incorrecta", success: false});
            }
        });
    } else if (mail !== null){
        bcrypt.compare(password, mail.password, (error, response) => {
            if (response) {
                req.session.user = mail;
                res.send({message: `${username} logeado` , success: true, user: mail.username});
            } else {
                res.send({message: "Contraseña incorrecta", success: false});
            }
        });
    } else {
        res.send({message: "Usuario Inexistente", success: false});
    } 
});

module.exports = router;
