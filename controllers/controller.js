var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
          burgers: data
        };
    
        res.render("index", hbsObject);
      });
});

router.post("/api/burgers", function(req, res) {
    burger.add(["burger_name"], [req.body.burger_name], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    
    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        res.end();
        
    });
});

module.exports = router;