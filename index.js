const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("good evening :)");
});

app.listen(8000, () => {
  console.log("here the output of my app");
});
