const express = require('express');
const router = express.Router();
const {Users} = require('../models/users')
const nodemailer = require('nodemailer');

// Send an email to a user for changin his password
router.post('/', async (req, res) => {
    let {mail} = req.body;
    try {
        var user = await Users.findOne({where: {mail}});
    }
    catch(err){
        return res.send({message: `Error finding User` , err, success: false});
    }

    let base64user = Buffer.from(`${user.username}`).toString('base64')
    const url = `https://skate-guide.vercel.app/changePassword/${base64user}`

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

    transporter.sendMail(mailOptions, err => {
        if (err) {
            return res.send({message: `Error sending mail` , err, success: false});
        }
        res.send({message: `Mail sent`, success: true});
    });
})

module.exports = router;