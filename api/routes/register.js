var express = require('express');
var router = express.Router();
const db = require('../db');
const Users = require('../models/users')

router.post('/', async function(req, res) {
    let {username, mail, password} = req.body;
    let crear = true;
    try {
        await Promise.all([Users.findOne({ where : {username}}), Users.findOne({ where : {mail}})])
        .then(values =>{
            if (values[0] !== null) {
                res.send("Nombre de Usuario no disponible");
                crear = false;
            }
            if (values[1] !== null) {
                res.send("Mail ya registrado");
                crear = false;
            }
        })
        if (crear == true) {
            let user = await Users.create({
                username,
                mail,
                password
            })
            res.send(`${username} registrado correctamente`);
        }
    }
    catch(err){
        console.log(err);
    } 
});

module.exports = router;
