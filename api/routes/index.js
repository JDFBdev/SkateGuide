var express = require('express');
var router = express.Router();

const tricks = require('./tricks');
const createTrick = require('./createTrick');

router.use('/tricks', tricks);
router.use('/createTrick', createTrick);

/* GET home page. */
router.get('*', (req, res) => {
  res.status(200).send('/tricks');
});

module.exports = router;
