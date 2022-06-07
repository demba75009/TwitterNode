const User = require("../database/models/user.models");

exports.CreateUsers = async (body) => {
  try {
    const hashedPassword = await User.hashPassword(body.password);
    const newUser = new User({
      username: body.username,
      local: {
        email: body.email,
        password: hashedPassword,
      },
    });
    return newUser.save();
  } catch (e) {
    throw e;
  }
};

exports.GetUserPerUserName = (username) => {
  const regex = `${username}`;

  const reg = new RegExp(regex);

  return User.find({ username: { $regex: reg } }).exec();
};

exports.findUserPerEmail = (email) => {
  return User.findOne({ "local.email": email }).exec();
};

exports.findUserPerId = (id) => {
  return User.findById(id).exec();
};

exports.findUserByUsername = (username) => {
  return User.findOne({ username }).exec();
};

exports.addUserIdToCurrentUserFollowing = (currentUser, userId) => {
  currentUser.following = [...currentUser.following, userId];
  return currentUser.save();
};

exports.removeUserIdToCurrentUserFollowing = (currentUser, userId) => {
  currentUser.following = currentUser.following.filter(
    (objId) => objId.toString() !== userId
  );
  return currentUser.save();
};
