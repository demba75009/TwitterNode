const router = require("express").Router();
const tweets = require("./tweets");
const Tweet = require("../database/models/tweet.models");
const users = require("./users.routeurs");
const auth = require("./auth.routeurs");

router.use("/tweets", tweets);
router.use("/users", users);
router.use("/auth", auth);

router.get("/", (req, res, next) => {
  res.redirect("/tweets");
});

module.exports = router;
