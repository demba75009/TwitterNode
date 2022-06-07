const {
  CreateUsers,
  findUserByUsername,
  GetUserPerUserName,
  findUserPerId,
  addUserIdToCurrentUserFollowing,
  removeUserIdToCurrentUserFollowing,
} = require("../queries/Users.queries");
const { getUserTweetsFormAuthorId } = require("../queries/tweets.queries");

const path = require("path");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images/avatars"));
    },

    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

exports.UnfollowUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([
      removeUserIdToCurrentUserFollowing(req.user, userId),
      findUserPerId(userId),
    ]);
    res.redirect(`/users/${user.username}`);
  } catch (e) {
    next(e);
  }
};

exports.FollowUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([
      addUserIdToCurrentUserFollowing(req.user, userId),
      findUserPerId(userId),
    ]);
    res.redirect(`/users/${user.username}`);
  } catch (e) {
    next(e);
  }
};

exports.UserList = async (req, res, next) => {
  try {
    const username = req.query.search;
    const users = await GetUserPerUserName(username);

    res.render("./includes/Userlist", { users });
  } catch (e) {
    next(e);
  }
};

exports.GetUserName = async (req, res, next) => {
  try {
    const username = req.params.username;

    const user = await findUserByUsername(username);

    const tweets = await getUserTweetsFormAuthorId(user._id);

    res.render("tweets/tweet-list", {
      tweets,
      isAuthenticated: req.isAuthenticated(),
      user,
      editable: false,
      currentUser: req.user,
    });
  } catch (E) {
    next(E);
  }
};

exports.signupForm = (req, res, next) => {
  res.render("user/Signup", {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
};

exports.signup = async (req, res, next) => {
  const body = req.body;

  try {
    const Use = await CreateUsers(body);
    res.redirect("/");
  } catch (e) {
    res.render("user/Signup", {
      errors: [e.message],
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};

exports.UpdateImage = [
  upload.single("avatar"),

  async (req, res, next) => {
    try {
      const user = req.user;

      user.avatar = `/images/avatars/${req.file.filename}`;

      await user.save();

      res.redirect("/");
    } catch (E) {
      throw E;
    }
  },
];
