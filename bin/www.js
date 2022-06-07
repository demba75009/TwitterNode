const https = require("https");
const app = require("../app");
const fs = require("fs");
const path = require("path");

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "../ssl/localhost.key")),
    cert: fs.readFileSync(path.join(__dirname, "../ssl/localhost.crt")),
  },
  app
);

server.listen(443);
