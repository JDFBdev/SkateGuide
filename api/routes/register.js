var express = require('express');
var router = express.Router();
const db = require('../db');
const {Users} = require('../models/users')

router.post('/', async function(req, res) {
    let {username, mail, password} = req.body;
    let crear = true;
    try {
        await Promise.all([Users.findOne({ where : {username}}), Users.findOne({ where : {mail}})])
        .then(values =>{
            if (values[0] !== null) {
                res.send({message: "Nombre de Usuario no disponible", success: false});
                crear = false;
            }
            if (values[1] !== null) {
                res.send({message: "Mail ya registrado", success: false});
                crear = false;
            }
        })
        if (crear == true) {
            await Users.create({
                username,
                mail,
                password,
                points: 0
            })
            res.send({message: `${username} registrado correctamente` , success: true});
        }
    }
    catch(err){
        console.log(err);
    } 
});

module.exports = router;
