const router = require("express").Router();
const auth = require("../config/auth");

router.use("/api/categories", auth.required, require("./category"));
router.use("/api/transactions", auth.required, require("./transaction"));
router.use("/api/auth", require("./user"));

module.exports = router;
