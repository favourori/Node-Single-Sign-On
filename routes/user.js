let express = require("express");
let router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let User = require("../models/user");

router.get("/", (req, res) => {
  res.status(200).send("User route");
});

module.exports = router;
