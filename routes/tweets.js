const router = require("express").Router();
const Tweet = require("../database/models/tweet.models");
const {
  GetTweets,
  CreateTweets,
  NewTweet,
  DeleteTweets,
  tweetEdit,
  tweetUpdate,
} = require("../controller/tweets.controller");

const { Authenticated } = require("../config/guard.config");

router.post("/", CreateTweets);

router.get("/new", Authenticated, NewTweet);

router.get("/", Authenticated, GetTweets);
router.delete("/:tweetid", DeleteTweets);
router.get("/edit/:tweetId", tweetEdit);
router.post("/update/:tweetId", tweetUpdate);

module.exports = router;
