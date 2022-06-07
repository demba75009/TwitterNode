const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = schema({
  username: { type: String, unique: true },
  local: {
    email: { type: String, unique: true },
    password: { type: String },
  },
  avatar: {
    type: String,
    default:
      "https://img.myloview.fr/images/male-icon-vector-user-person-profile-avatar-in-flat-color-glyph-pictogram-illustration-400-163243023.jpg",
  },
  following: { type: [schema.Types.ObjectId], ref: "user" },
});

userSchema.statics.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  } catch (e) {
    throw e;
  }
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.local.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
