let express = require("express");
let app = express();
require("dotenv").config();
const mongoose = require("mongoose");

//importing routes
let userRoute = require("./routes/user");

//using routes

app.use("/sso/api/user", userRoute);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h2>ABiTNetwork SSO (Single Sign-on )</h2>  <small>Version 1.0.0 - @Favourori</small>"
    );
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
