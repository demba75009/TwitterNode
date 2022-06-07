const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://donkey:dembaleboss@cluster0.m3r9p.mongodb.net/Twitter?retryWrites=true&w=majority"
  )
  .then(() => console.log("connexion db ok !"))
  .catch((err) => console.log(err));
