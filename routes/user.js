const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const auth = require("../config/auth");

router.get("/me", auth.required, (req, res, next) => {
  User.findById(req.payload.id)
    .then(user => {
      if (!user) {
        res.send({
          action: false,
          message: "something went wrong!"
        });
      } else {
        res.send({ action: true, data: { ...user.toAuthJSON() } });
      }
    })
    .catch(() => {
      res.send({
        action: false,
        message: "something went wrong!"
      });
    });
});

router.post("/signup", (req, res, next) => {
  const user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user
    .save()
    .then(() => {
      res.send({ action: true, data: { ...user.toAuthJSON() } });
    })
    .catch(() => {
      res.send({
        action: false,
        message: "something went wrong!"
      });
    });
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      user.token = user.generateJWT();
      res.send({ action: true, data: { ...user.toAuthJSON() } });
    } else {
      res.send({
        action: false,
        message: "something went wrong!"
      });
    }
  })(req, res, next);
});

module.exports = router;
