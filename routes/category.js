var router = require("express").Router();
//const mongoose = require("mongoose");
//const category = mongoose.model("Category");

//get all transactions

router.get("/", (req, res) => {
  res.send("helooo");
});

module.exports = router;
