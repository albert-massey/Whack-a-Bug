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
    var findUserfromGoogleId = function (idGoogle) {
        return User.findOne({ googleId: idGoogle }, function (err, user) {
        }).then(function(data) {
            // console.log("I am the returned "+data);
            return data;
        });
    };                                                                                              

    var fetchAllScores = function () {
        return Score.find({}, function (err, usersReturned) {
            if (err) return handleError(err);
        }).sort({
            score: 1
        }).limit(3).then(function(data) {
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
        }).limit(3).then(function(data) {
            return data;
        });
    };

    // fetchAllScores();
    Promise.all([fetchAllScores(), fetchLoggedInUserScores(), findUserfromGoogleId(googleIdee)]).then(function (data) {
        console.log("I am fetchLogged \n",data);
        res.render('profile', {
            user: req.user,
            userData: data
        });
    });
});

module.exports = router;