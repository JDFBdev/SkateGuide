var express = require('express');
var router = express.Router();

const AllTricks = require('./AllTricks');
const createTrick = require('./createTrick');
const deleteTrick = require('./deleteTrick');
const bulkCreate = require('./bulkCreate');
const editTrick = require('./editTrick');
const findTrick = require('./findTrick');

router.use('/AllTricks', AllTricks);
router.use('/createTrick', createTrick);
router.use('/deleteTrick', deleteTrick);
router.use('/bulkCreate', bulkCreate);
router.use('/editTrick', editTrick);
router.use('/findTrick/', findTrick);

/* GET home page. */
router.get('*', (req, res) => {
  res.status(200).send('/AllTricks');
});

module.exports = router;
