const router = require('express').Router();
const Score = require('../models/score-model');
const User = require('../models/user-model');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    // console.log("This is the user: "+req.user.googleId);
    var googleIdee = req.user.googleId;

    var fetchAllScores = function () {
        return Score.find({}, function (err, usersReturned) {
            if (err) return handleError(err);
        }).sort({
            score: 1
        }).limit(3).then(function (data) {
            // console.log(data);
            return data;
        });
    };
    var fetchLoggedInUserScores = function () {
        return Score.find({
            googleId: googleIdee
        }, function (err, usersReturned) {
            if (err) return handleError(err);
        }).sort({
            score: 1
        }).limit(3).then(function (data) {
            return data;
        });
    };

    // fetchAllScores();
    Promise.all([fetchAllScores(), fetchLoggedInUserScores()]).then(function (data) {
        console.log("I am fetchLogged \n", data[0].length);
        if (data[0].length >= 3) {
            res.render('profile', {
                user: req.user,
                userData: data
            });
        }
        else {
            res.send("Please play at least 3 times to see your leaderboard.");
        }

    });
});

module.exports = router;