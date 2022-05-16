const express = require('express');
const router = express.Router();
const {Users} = require('../models/users')
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    let {mail} = req.body;
    try {
        var user = await Users.findOne({where: {mail}});
    }
    catch(err){
        console.log(err);
    }

    let base64user = Buffer.from(`${user.username}`).toString('base64')
    const url = `http://localhost:3000/changePassword/${base64user}`

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
        subject: 'Change Password',
        text: `Enter here to change to a new password:\n${url}`,
        html:`
            <div>
                <p>Enter here to change to a new password:</p>
                <a href="${url}">${url}</a>
            </div>`
        };

    transporter.sendMail(mailOptions, e => {
        console.log(e);
    });
})

module.exports = router;