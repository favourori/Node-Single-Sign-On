let express = require("express");
let router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let User = require("../models/user");

router.get("/", (req, res) => {
  //res.status(200).send("User route");
  res.sendfile("public/signup.html");
});

//Get all Abitnetwork users

router.get("/allUsers", (req, res) => {
  User.find()
    .then(data => {
      res.status(200).send({ success: true, data: data });
    })
    .catch(e => {
      res.status(400).send({
        success: false,
        message: "No users found"
      });
    });
});

router.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (user) {
      res.status(200).send({ success: true, data: user });
    } else {
      res
        .status(200)
        .send({ success: false, message: "User with the id does not exist" });
    }
  } catch (e) {
    res.status(400).send({
      success: false,
      message: e.message
    });
  }
});

//handling user registration
router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res
        .status(400)
        .send({ success: false, message: "A user with this email exists" });
    } else {
      //Hash password
      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(req.body.password, salt);
      //console.log("not found");
      let newUser = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
      });

      newUser
        .save()
        .then(data => {
          const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET);
          let redirectUrl = `https://abitsso.herokuapp.com/?firstName=${data.firstName}&lastName=${data.lastName}&email=${data.email}&dateJoined=${data.dateJoined}`;
          res
            .header("auth-token", token)
            .status(200)
            // .send({
            //   success: true,
            //   data: data,
            //   token: token
            // });
            .redirect(redirectUrl);
          console.log(redirectUrl);
        })
        .catch(err => {
          res.status(400).send(err.message);
        });
    }
  } catch (e) {
    console.log(e.message);
  }
});

//handling user login
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "Invalid credentials" });

    //Else if the email is valid, let's check for the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //console.log(validPassword)
    if (!validPassword)
      return res
        .status(400)
        .send({ success: false, message: "Invalid credentials" });

    //Username & password are valid..
    //Create & Assign Token

    const token = jwt.sign({ user: user }, process.env.JWT_SECRET);
    res
      .header("auth-token", token)
      .status(200)
      .send({ success: true, token: token, data: user });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//end

module.exports = router;
