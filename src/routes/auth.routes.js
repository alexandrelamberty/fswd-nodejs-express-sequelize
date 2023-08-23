var express = require("express");
var authRouter = express.Router();

authRouter.post("/login", function (req, res) {
  res.json({ users: "loginUser" });
});

authRouter.post("/logout", function (req, res) {
  res.json({ users: "logoutUser" });
});

authRouter.post("/register", function (req, res) {
  res.json({ users: "registerUser" });
});

module.exports = authRouter;
