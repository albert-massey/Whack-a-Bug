// var db = require("../models");
const router = require('express').Router();
const passport = require('passport');
const Score = require('../models/score-model');
const User = require('../models/user-model');


router.get('/gameplay', (req, res) => {
  new Score({
    googleId: "111",
    thumbnail: "111",
    difficulty: "easy",
    score: 100
  }).save().then((newScore) => {
    console.log("created a new score record in scoreModel: ", newScore);
  });
  User.find({ }, function (err, usersReturned) {
    if (err) return handleError(err);
    // 'athletes' contains the list of athletes that match the criteria.
  }).then(function (data) {
    // use doc
    console.log("This is data received"+data);
    // console.log(usersReturned);
    res.render('gameplay', {
      user: req.user,
      userData: data
    });
  });
  

});

module.exports = router;