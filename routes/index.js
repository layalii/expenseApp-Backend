const router = require("express").Router();

router.use("/api/categories", require("./category"));
router.use("/api/transactions", require("./transaction"));

module.exports = router;
