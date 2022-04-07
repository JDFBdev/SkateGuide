var express = require('express');
var router = express.Router();

const tricks = require('./tricks');

router.use('/tricks', tricks);

/* GET home page. */
router.get('*', (req, res) => {
  res.status(200).send('/tricks');
});

module.exports = router;
