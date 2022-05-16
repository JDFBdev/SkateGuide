const express = require('express');
const router = express.Router();
const Users = require('../models/tricks')

router.post('/', async (req, res) => {
    let {user, pass} = req.body;
    try {
        await Users.update(
                { password : pass},
                { where: { username: user } }
            )
        res.send({message: `contrasenia modificada correctamente` , success: true});
    }
    catch(err){
        res.send({message: `contrasenia no se pudo modificar` , success: false});
    }
})

module.exports = router;