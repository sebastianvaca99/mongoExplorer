var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.databases.listDatabases().then(databases => {
    console.log("1", databases.databases);
    res.render("index", {
      databases
    });
  });
});

router.get("/collections/:database", function(req, res) {
  console.log("Entro a /schedules con GET.", req.params);
  const database =  req.params.database;
  mu.databases.listcollections(database).then(collections => {
    console.log(collections);
    res.send(collections);
  }).catch();
});

router.get("/content/:database/:collection", function(req, res) {
  console.log("Entro a /content con GET.", req.params);
  const database =  req.params.database;
  const collection = req.params.collection;
  mu.databases.find(database,collection).then(contents => {
    console.log(contents);
    res.send(contents);
  }).catch();
});


router.get("/databases", function(req, res) {
  mu.databases.listDatabases().then(databases => {
    console.log("1", databases);
    res.json(databases);
  });
});

module.exports = router;
