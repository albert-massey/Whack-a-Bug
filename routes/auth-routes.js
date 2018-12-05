const router = require('express').Router();
const passport = require('passport');
const Score = require('../models/score-model');

// // auth login
// router.get('/gameplay', (req, res) => {
//     new Score({
//         googleId: "222",
//         thumbnail: "222",
//         difficulty: "easy",
//         score: 100
//     }).save().then((newScore) => {
//         console.log("created a new score record in scoreModel: ", newScore);
//     });
//     res.render('gameplay', { user: req.user });
// });

// auth login
router.get('/login', (req, res) => {
    new Score({
        googleId: "222",
        thumbnail: "222",
        difficulty: "easy",
        score: 100
    }).save().then((newScore) => {
        console.log("created a new score record in scoreModel: ", newScore);
    });
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});

module.exports = router;
