var express = require('express');
var router = express.Router();

const tricks = require('./tricks');
const createTrick = require('./createTrick');
const deleteTrick = require('./deleteTrick');
const bulkCreate = require('./bulkCreate');

router.use('/tricks', tricks);
router.use('/createTrick', createTrick);
router.use('/deleteTrick', deleteTrick);
router.use('/bulkCreate', bulkCreate);

/* GET home page. */
router.get('*', (req, res) => {
  res.status(200).send('/tricks');
});

module.exports = router;
