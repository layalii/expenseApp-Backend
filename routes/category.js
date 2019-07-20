var router = require("express").Router();
const mongoose = require("mongoose");
const category = mongoose.model("Category");

//get all categories

router.get("/", (req, res) => {
  //get all categories
  category
    .find()
    .then(docs => {
      if (docs) {
        //return response
        res.send({
          action: true,
          //Transform data
          data: docs
        });
      } else {
        //return response
        res.send({
          action: false,
          message: "No data available"
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

//get category by id

router.get("/:id", (req, res) => {
  //get all categories
  const id = req.params.id;
  category
    .findOne({ _id: id })
    .then(doc => {
      if (doc) {
        //return response
        res.send({
          action: true,
          //Transform data
          data: doc
        });
      } else {
        //return response
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

//create categories

router.post("/", (req, res) => {
  //get all categories
  const itemToAdd = new category(req.body);
  if (!itemToAdd.title) {
    res.send("complete your data");
    return;
  }
  itemToAdd
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
    .catch(() => {
      res.send({
        action: false,
        message: "something went wrong"
      });
    });
});

//update category

router.put("/:id", (req, res) => {
  //get all categories
  category
    .findOne({ _id: req.params.id })
    .then(doc => {
      if (doc) {
        const { title, description, style } = req.body;
        if (title) doc.title = title;
        if (description) doc.description = description;
        if (style) doc.style = style;
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

//delete category

router.delete("/:id", (req, res) => {
  category
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
