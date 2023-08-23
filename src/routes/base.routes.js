var router = require("express").Router();

router.get("/", function (req, res) {
  res.json({ users: "home" });
});

router.get("/about", function (req, res) {
  res.json({ users: "about" });
});

module.exports = router;
