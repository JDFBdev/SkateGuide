// var express = require('express');
// var router = express.Router();
// const db = require('../db');
// const Users = require('../models/users')

// router.post('/', async function(req, res) {
//     let {username, password} = req.body;
//     try {
//         await Promise.all([Users.findOne({ where : {username}}), Users.findOne({ where : {password}})])
//         .then(values =>{
//             if (values[0] === null) {
//                 res.send({message: "Usuario Inexistente", success: false});
//             }
//             if (values[1] === null) {
//                 res.send({message: "Contraseña incorrecta", success: false});
//             }
//         })
//         res.send({message: `${username} logeado` , success: true});
//     }
//     catch(err){
//         console.log(err);
//     }
// });

// module.exports = router;
