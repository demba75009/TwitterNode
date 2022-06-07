const router = require("express").Router();
const {
  signup,
  signupForm,
  UpdateImage,
  GetUserName,
  UserList,
  FollowUser,
  UnfollowUser,
} = require("../controller/users.controller");

const { Authenticated } = require("../config/guard.config");
router.get("/follow/:userId", FollowUser);
router.get("/unfollow/:userId", UnfollowUser);

router.get("/:username", GetUserName);
router.get("/", UserList);

router.get("/signup/form", signupForm);
router.post("/signup", signup);
router.post("/update/image", Authenticated, UpdateImage);

module.exports = router;
