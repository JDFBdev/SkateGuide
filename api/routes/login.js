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
    }
    catch(err){
        console.log(err);
    }
    if (user !== null){
        bcrypt.compare(password, user.password, (error, response) => {
            if (response) {
                req.session.user = user;
                res.send({message: `${username} logeado` , success: true});
            } else {
                res.send({message: "Contraseña incorrecta", success: false});
            }
        });
    } else {
        res.send({message: "Usuario Inexistente", success: false});
    } 
});

module.exports = router;
