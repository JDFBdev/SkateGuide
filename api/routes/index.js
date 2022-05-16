var express = require('express');
var router = express.Router();

const allTricks = require('./allTricks');
const createTrick = require('./createTrick');
const deleteTrick = require('./deleteTrick');
const bulkCreate = require('./bulkCreate');
const editTrick = require('./editTrick');
const findTrick = require('./findTrick');
const register = require('./register');
const login = require('./login');
const deleteUser = require('./deleteUser');
const bulkCreateStances = require('./bulkCreateStances');
const addStance = require('./addStance');
const deleteStance = require('./deleteStance');
const leaderboard = require('./leaderboard');
const sendEmail = require('./sendEmail');
const changePassword = require('./changePassword');

router.use('/allTricks', allTricks);
router.use('/createTrick', createTrick);
router.use('/deleteTrick', deleteTrick);
router.use('/bulkCreate', bulkCreate);
router.use('/editTrick', editTrick);
router.use('/findTrick', findTrick);
router.use('/register', register);
router.use('/login', login);
router.use('/deleteUser', deleteUser);
router.use('/bulkCreateStances', bulkCreateStances);
router.use('/addStance', addStance);
router.use('/deleteStance', deleteStance);
router.use('/leaderboard', leaderboard);
router.use('/sendEmail', sendEmail);
router.use('/changePassword', changePassword);

/* GET home page. */
router.get('*', (req, res) => {
  res.status(200).send('/AllTricks');
});

module.exports = router;
