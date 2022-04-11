const express = require('express');
const router = express.Router();
const db = require('../db');
const Tricks = require('../models/tricks')

router.post('/', async (req, res) => {
    try {
        let trick = await Tricks.bulkCreate([
        {
            id : 0,
            name: 'Ollie',
            rating: 1,
            description: 'Poping your skateboard off the ground.',
            video: 'https://www.youtube.com/embed/VasSLuFO4wY',
            type: 'Street'
        },
        {
            id : 1,
            name: 'Shove It',
            rating: 1,
            description: 'Rotate your board 180º in the backside direction without popping.',
            video: 'https://www.youtube.com/embed/o2FErg5FL-M',
            type: 'Street'
        },
        {
            id : 2,
            name: 'Frontside 180',
            rating: 1,
            description: 'Ollie while rotating 180º in the frontside direction. Both the skater and the board rotate.',
            video: 'https://www.youtube.com/embed/ZSe9vPoXKiU',
            type: 'Street'
        },
        {
            id : 3,
            name: 'Backside 180',
            rating: 1,
            description: 'Ollie while rotating 180º in the backside direction. Both the skater and the board rotate.',
            video: 'https://www.youtube.com/embed/IV27vYiLf6E',
            type: 'Street'
        },
        {
            id : 4,
            name: 'Pop Shove It',
            rating: 1,
            description: 'Rotate your board 180º in the backside direction with a pop.',
            video: 'https://www.youtube.com/embed/-iufpca3f00',
            type: 'Street'
        },
        {
            id : 5,
            name: 'Frontside Pop Shove It',
            rating: 1,
            description: 'Rotate your board 180º in the frontside direction with a pop.',
            video: 'https://www.youtube.com/embed/Ow0FJbBSIyg',
            type: 'Street'
        },
        {
            id : 6,
            name: 'Kickflip',
            rating: 1,
            description: 'Flip your skateboard 360° along the axis that extends from the nose to the tail of the deck. When the rider is regular footed the board spins counter-clockwise.',
            video: 'https://www.youtube.com/embed/Zebs7JZ2PW0',
            type: 'Street'
        },
        {
            id : 7,
            name: 'Heelflip',
            rating: 1,
            description: 'Flip your skateboard 360° along the axis that extends from the nose to the tail of the deck. When the rider is regular footed the board spins clockwise.',
            video: 'https://www.youtube.com/embed/kTKySohOatw',
            type: 'Street'
        },
        {
            id : 8,
            name: 'Varial Flip',
            rating: 2,
            description: 'Backside Pop Shove It with a Kickflip.',
            video: 'https://www.youtube.com/embed/VC4jzFMbGGY',
            type: 'Street'
        },
        {
            id : 9,
            name: 'Hardflip',
            rating: 2,
            description: 'Frontside Pop Shove It with a Kickflip.',
            video: 'https://www.youtube.com/embed/56rAynxox9Q',
            type: 'Street'
        },
        {
            id : 10,
            name: 'Varial Heelflip',
            rating: 2,
            description: 'Frontside Pop Shove It with a Heelflip.',
            video: 'https://www.youtube.com/embed/Y5eoY6EuwTc',
            type: 'Street'
        },
        {
            id : 11,
            name: 'Inward Heelflip',
            rating: 2,
            description: 'Backside Pop Shove It with a Heelflip.',
            video: 'https://www.youtube.com/embed/coPrYJghnAU',
            type: 'Street'
        },
        {
            id : 12,
            name: 'Backside Kickflip',
            rating: 2,
            description: 'Backside 180º with a Kickflip.',
            video: 'https://www.youtube.com/embed/2Sy-jDHW9Ng',
            type: 'Street'
        },
        {
            id : 13,
            name: 'Backside Heelflip',
            rating: 2,
            description: 'Backside 180º with a Heelflip.',
            video: 'https://www.youtube.com/embed/v4VncuPiai0',
            type: 'Street'
        },
        {
            id : 14,
            name: 'Frontside Kickflip',
            rating: 2,
            description: 'Frontside 180º with a Kickflip.',
            video: 'https://www.youtube.com/embed/_YCXMS2_O6w',
            type: 'Street'
        },
        {
            id : 15,
            name: 'Frontside Heelflip',
            rating: 2,
            description: 'Frontside 180º with a Heelflip.',
            video: 'https://www.youtube.com/embed/XILp8ZI19NU',
            type: 'Street'
        },
        {
            id : 16,
            name: 'Backside Bigspin',
            rating: 2,
            description: 'Backside 180º with an extra 180º rotation. The skater does a 180º rotation while the board does a 360º rotation, both in backside direction.',
            video: 'https://www.youtube.com/embed/PYaQGPfOqr4',
            type: 'Street'
        },
        {
            id : 17,
            name: 'Frontside Bigspin',
            rating: 2,
            description: 'Frontside 180º with an extra 180º rotation. The skater does a 180º rotation while the board does a 360º rotation, both in frontside direction.',
            video: 'https://www.youtube.com/embed/j4yl5oohSco',
            type: 'Street'
        },
        {
            id : 18,
            name: '360 Pop Shove It',
            rating: 2,
            description: 'Rotate your board 360º in the backside direction with a pop.',
            video: 'https://www.youtube.com/embed/QSLede9wExg',
            type: 'Street'
        },
        {
            id : 19,
            name: 'Treflip',
            rating: 2,
            description: 'The board rotates 360º in the backside direction, with an extra Kickflip rotation.',
            video: 'https://www.youtube.com/embed/ENzhijg0IBs',
            type: 'Street'
        },
        {
            id : 20,
            name: 'Laser Flip',
            rating: 2,
            description: 'The board rotates 360º in the frontside direction, with an extra Hickflip rotation.',
            video: 'https://www.youtube.com/embed/si_H18QjU58',
            type: 'Street'
        },
        {
            id : 21,
            name: 'Backside 360 Ollie',
            rating: 2,
            description: 'Both the skater and the board rotate 360º in the backside direction.',
            video: 'https://www.youtube.com/embed/D2zq6OacC_U',
            type: 'Street'
        },
        {
            id : 22,
            name: 'Frontside 360 Ollie',
            rating: 2,
            description: 'Both the skater and the board rotate 360º in the frontside direction.',
            video: 'https://www.youtube.com/embed/yq1dnYOoLWQ',
            type: 'Street'
        },
        {
            id : 23,
            name: 'Double Kickflip',
            rating: 2,
            description: 'Flip your skateboard 720° along the axis that extends from the nose to the tail of the deck. When the rider is regular footed the board spins counter-clockwise.',
            video: 'https://www.youtube.com/embed/kLgi2oaM3cw',
            type: 'Street'
        },
        {
            id : 24,
            name: 'Pressure Flip',
            rating: 2,
            description: 'Inward Heelflip done by flipping solely with your popping foot.',
            video: 'https://www.youtube.com/embed/37EWEQPnH4U',
            type: 'Street'
        },
        {
            id : 25,
            name: 'Impossible',
            rating: 2,
            description: 'Impossibles are performed when the skateboard is wrapped almost vertically over the back foot while in the air, resulting in a 360º rotation of the board.',
            video: 'https://www.youtube.com/embed/Fi7gPPN9zC8',
            type: 'Street'
        }
        ])
        .then(() =>res.send(`Trucos registrados correctamente`))
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
})

module.exports = router;