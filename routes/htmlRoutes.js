// var db = require("../models");
const router = require('express').Router();
const passport = require('passport');
const Score = require('../models/score-model');

// module.exports = function(app) {
//     // Load index page
//     app.get("/", function(req, res) {
//       db.Example.findAll({}).then(function(dbExamples) {
//         res.render("index", {
//           msg: "Welcome!",
//           examples: dbExamples
//         });
//       });
//     });
  
//     // Load example page and pass in an example by id
//     app.get("/example/:id", function(req, res) {
//       db.Example.findOne({ where: { id: req.params.id } }).then(function(
//         dbExample
//       ) {
//         res.render("example", {
//           example: dbExample
//         });
//       });
//     });
  
//     // Load gameplay page and pass in an example by id
//     router.get("/gameplay", function(req, res) {
//       // db.Example.findOne({ where: { id: req.params.id } }).then(function(
//       //   dbExample
//       // ) {
//         res.render("gameplay", {
//           example: dbExample
//         });
//       // });
//     });
    // Render 404 page for any unmatched routes
    router.get("*", function(req, res) {
      res.render("404");
    });
    
    module.exports = router;
    
  // };
  