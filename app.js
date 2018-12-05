const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const gameRoutes = require('./routes/game-routes');
const htmlRoutes = require('./routes/htmlRoutes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/game', gameRoutes);
app.use('/*', gameRoutes);



// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.listen(port, () => {
    console.log('app now listening for requests on port ' + port + '. https://localhost:' + port);
});
