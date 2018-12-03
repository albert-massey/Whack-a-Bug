// var db = require("../models");
const router = require('express').Router();
const passport = require('passport');
const Score = require('../models/score-model');

router.get('/gameplay', (req, res) => {
  res.render('gameplay', { user: req.user });
});

module.exports = router;
