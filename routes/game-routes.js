const router = require('express').Router();
const passport = require('passport');
const Score = require('../models/score-model');
const User = require('../models/user-model');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


router.get('/gameplay', (req, res) => {
  res.render('gameplay', {
    user: req.user,
  });
});

router.post("/score", jsonParser, function (req, res) {
  // Take the request...
  var newScore = req.body;
  newScore.googleId = req.user.googleId;
  newScore.thumbnail = req.user.thumbnail;
  console.log("I am line 24 game-routes\n", newScore);
  var latest = new Score({
    googleId: newScore.googleId,
    thumbnail: newScore.thumbnail,
    difficulty: newScore.difficulty,
    score: newScore.score
  });

  Score.create(latest)
    .then(score => {
      console.log("Created a score record!");
      res.status(201).json(score);
    })
    .catch(err => {
      res.status(400).json(err);
    });

});

module.exports = router;