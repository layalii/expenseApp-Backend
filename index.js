const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./models/transaction");
require("./models/category");

app.use(require("./routes"));

const Category = mongoose.model("Category");
const Transaction = mongoose.model("Transaction");

// const new_cat1 = new Category({
//   title: "travel",
//   description: "gelooooo cat"
// });
// const new_cat2 = new Category({
//   title: "lifeStyle",
//   description: "gelooooo cat"
// });

// const new_trans = new Transaction({
//   title: "transa1",
//   description: "",
//   amount: 100,
//   date: 12 / 10 / 2019,
//   categories: [new_cat1._id, new_cat2._id],
//   type: "REVENUE"
// });

// new_cat1
//   .save()
//   .then()
//   .catch(e => console.log(e));

// new_cat2
//   .save()
//   .then(() => {
//     console.log("category2 SAVED");
//   })
//   .catch(e => console.log(e));

// new_trans
//   .save()
//   .then(() => {
//     console.log("transaction SAVED");
//   })
//   .catch(e => console.log(e));
app.listen(8000, () => {
  console.log("here the output of my app");
});
