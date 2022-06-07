const {
  getTweets,
  createTweet,
  DeleteTweet,
  getTweet,
  updateTweet,
  getCurrentUserTweetsWithFollowing,
} = require("../queries/tweets.queries");

exports.tweetUpdate = async (req, res, next) => {
  const tweetId = req.params.tweetId;
  try {
    const body = req.body;
    await updateTweet(tweetId, body);
    res.redirect("/tweets");
  } catch (e) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    const tweet = await getTweet(tweetId);
    res.status(400).render("tweets/tweet-form", {
      errors,
      tweet,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
      user: req.user,
      editable: true,
    });
  }
};

exports.GetTweets = async (req, res, next) => {
  try {
    const tweets = await getCurrentUserTweetsWithFollowing(req.user);
    res.render("tweets/tweet-list", {
      tweets,
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      editable: true,
      currentUser: req.user,
    });
  } catch (e) {
    next(e);
  }
};

exports.tweetEdit = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    const tweet = await getTweet(tweetId);
    res.render("tweets/tweet-form", {
      tweet,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
      user: req.user,
      editable: true,
    });
  } catch (e) {
    next(e);
  }
};

exports.CreateTweets = async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    await createTweet({ ...body, author: req.user._id });
    res.redirect("/");
  } catch (e) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    res.status(400).render("tweets/tweet-form", {
      errors,
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
    });
  }
};

exports.NewTweet = async (req, res, next) => {
  res.render("tweets/tweet-form", {
    tweet: {},
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
  });
};

exports.DeleteTweets = async (req, res, next) => {
  try {
    const tweetId = req.params.TweetsId;
    await DeleteTweet(tweetId);
    const tweets = await getTweets();
    res.render("tweets/tweet", { tweets, user: req.user, editable: true });
  } catch (e) {
    next(e);
  }
};
