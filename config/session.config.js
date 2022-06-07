const app = require("../app");

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: "je suis ",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://donkey:dembaleboss@cluster0.m3r9p.mongodb.net/Twitter?retryWrites=true&w=majority",
      ttl: 60 * 60 * 24 * 7,
    }),
  })
);
