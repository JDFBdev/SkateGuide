var express = require('express');
var router = express.Router();

const allTricks = require('./allTricks');
router.use('/allTricks', allTricks);

const createTrick = require('./createTrick');
router.use('/createTrick', createTrick);

const deleteTrick = require('./deleteTrick');
router.use('/deleteTrick', deleteTrick);

const bulkCreateTricks = require('./bulkCreateTricks');
router.use('/bulkCreateTricks', bulkCreateTricks);

const editTrick = require('./editTrick');
router.use('/editTrick', editTrick);

const findTrick = require('./findTrick');
router.use('/findTrick', findTrick);

const register = require('./register');
router.use('/register', register);

const login = require('./login');
router.use('/login', login);

const deleteUser = require('./deleteUser');
router.use('/deleteUser', deleteUser);

const bulkCreateStances = require('./bulkCreateStances');
router.use('/bulkCreateStances', bulkCreateStances);

const addStance = require('./addStance');
router.use('/addStance', addStance);

const deleteStance = require('./deleteStance');
router.use('/deleteStance', deleteStance);

const leaderboard = require('./leaderboard');
router.use('/leaderboard', leaderboard);

const sendEmail = require('./sendEmail');
router.use('/sendEmail', sendEmail);

const changePassword = require('./changePassword');
router.use('/changePassword', changePassword);

const logout = require('./logout');
router.use('/logout', logout);

/* GET home page. */
router.get('*', (req, res) => {
  res.status(200).send('/allTricks');
});

module.exports = router;
