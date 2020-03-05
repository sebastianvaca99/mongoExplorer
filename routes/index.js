var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.databases.listDatabases().then(databases =>{
    console.log("1",databases);
    res.render("index", {
      databases
    })}
  );
});



module.exports = router;
