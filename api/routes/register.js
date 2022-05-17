var express = require('express');
var router = express.Router();
const {Users} = require('../models/users')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async function(req, res) {
    let {username, mail, password} = req.body;
    let crear = true;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'sbtrickguide@gmail.com',
        pass: 'tuki1234!'
        }
        });
    const mailOptions = {
        from: 'The SB Trick Guide',
        to: mail,
        subject: 'Your New Account',
        text: `This are your new credentials for login into The SB Trick Guide:\nusername: ${username}\npassword: ${password}`
        };
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
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                Users.create({
                    username,
                    mail,
                    password : hash,
                    points: 0
                })
            })
            transporter.sendMail(mailOptions, e => {
                console.log(e);
            });
            res.send({message: `${username} registrado correctamente` , success: true});
        }
    }
    catch(err){
        console.log(err);
    } 
});

module.exports = router;
