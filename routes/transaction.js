var router = require("express").Router();
const mongoose = require("mongoose");
const transaction = mongoose.model("Transaction");

//get all transactions

router.get("/", (req, res) => {
  transaction
    .find()
    .then(docs => {
      if (docs) {
        res.send({
          action: true,
          data: docs
        });
      } else {
        res.send({
          action: false,
          message: "no data available"
        });
      }
    })
    .catch(err => {
      res.send({
        action: false,
        message: "something went wrong"
      });
    });
});

//get transaction by id

router.get("/:id", (req, res) => {
  const id = req.params.id;
  transaction
    .findOne({ _id: id })
    .then(doc => {
      if (doc) {
        res.send({
          action: true,
          data: doc
        });
      } else {
        res.send({
          action: false,
          message: "item not found"
        });
      }
    })
    .catch(err => {
      res.send({
        action: false,
        message: "something went wrong"
      });
    });
});

//create transaction

router.post("/", (req, res) => {
  const new_transaction = new transaction(req.body);
  if (!new_transaction.amount || !new_transaction.title) {
    res.send("complete your data");
    return;
  }
  new_transaction
    .save()
    .then(doc => {
      if (doc) {
        res.send({
          action: true,
          data: doc
        });
      } else {
        res.send({
          action: true,
          message: "Not added! try again"
        });
      }
    })
    .catch(err => {
      res.send({
        action: false,
        message: "something went wrong"
      });
    });
});

//update transaction

router.put("/:id", (req, res) => {
  //get all categories
  transaction
    .findOne({ _id: req.params.id })
    .then(doc => {
      if (doc) {
        const { title, amount, date, type, description, categories } = req.body;
        if (title) doc.title = title;
        if (description) doc.description = description;
        if (amount) doc.amount = amount;
        if (type) doc.type = type;
        if (date) doc.date = date;
        if (categories) doc.categories = categories;
        doc
          .save()
          .then(_doc => {
            res.send({
              action: true,
              data: _doc
            });
          })
          .catch(() => {
            res.send({
              action: false,
              message: "item not updated! retry"
            });
          });
      } else {
        res.send({
          action: false,
          message: "item not found"
        });
      }
    })
    .catch(() => {
      res.send({
        action: false,
        message: "something went wrong"
      });
    });
});

// delete transaction

router.delete("/:id", (req, res) => {
  transaction
    .deleteOne({ _id: req.params.id })
    .then(doc => {
      res.send({
        action: true,
        data: {}
      });
    })
    .catch(() => {
      res.send({
        action: false,
        message: "something went wrong"
      });
    });
});

module.exports = router;
