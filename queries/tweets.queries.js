const Tweet = require("../database/models/tweet.models");

exports.getTweets = () => {
  return Tweet.find({}).exec();
};

exports.createTweet = (tweet) => {
  const T = new Tweet(tweet);

  return T.save();
};

exports.DeleteTweet = (tweetId) => {
  return Tweet.findOneAndDelete(tweetId);
};

exports.getTweet = (tweetId) => {
  return Tweet.findOne({ _id: tweetId }).exec();
};

exports.updateTweet = (tweetId, tweet) => {
  return Tweet.findByIdAndUpdate(
    tweetId,
    { $set: tweet },
    { runValidators: true }
  );
};

exports.getCurrentUserTweetsWithFollowing = (user) => {
  return Tweet.find({ author: { $in: [...user.following, user._id] } })
    .populate("author")
    .exec();
};

exports.getUserTweetsFormAuthorId = (authorId) => {
  return Tweet.find({ author: authorId }).populate("author").exec();
};
