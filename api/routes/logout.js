var express = require('express');
var router = express.Router();

// Logout a user.
router.post('/', async function(req, res) {
    if (req.session.user) {
        req.session.destroy();
    }else{
        return res.send({message: 'Error logging out user' , success: false})
    }
    res.send({message: 'User logged out' , success: true})
});

module.exports = router;
