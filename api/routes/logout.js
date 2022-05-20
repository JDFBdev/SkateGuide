var express = require('express');
var router = express.Router();

router.post('/', async function(req, res) {
    if (req.session.user) {
        req.session.destroy();
        res.send({message: 'Usuario delogeado' , success: true})
    }else{
        res.send({message: 'Usuario no se pudo delogear' , success: false})
    }
});

module.exports = router;
