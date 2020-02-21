//core modulels
const path = require("path");


//Npm modules
let express = require("express");
let app = express();
require("dotenv").config();
const mongoose = require("mongoose");

//cors
let cors = require("cors");

//setting middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, "/public")));



//connect to db here
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to DB");
  })
  .catch(e => {
    console.log(e.message);
  });

//allowing cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Middlewares here
let bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//allowing for serving static files
app.use(express.static("public"));

// parse application/json
app.use(bodyParser.json());

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

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
