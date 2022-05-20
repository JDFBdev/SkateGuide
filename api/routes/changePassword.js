const express = require('express');
const router = express.Router();
const {Users} = require('../models/users')
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async (req, res) => {
    let {user, pass} = req.body;
    try {
        bcrypt.hash(pass, saltRounds, (err, hash) => {
            if (err) {
                console.log(err);
            }
            Users.update(
                { password : hash },
                { where: { username: user } }
            )
        })
        res.send({message: `contrasenia modificada correctamente` , success: true});
    }
    catch(err){
        res.send({message: `contrasenia no se pudo modificar` , success: false});
    }
})

module.exports = router;