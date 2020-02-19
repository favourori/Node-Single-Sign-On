const mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
  firstname: { type: String, required: [true, "please enter your firstname"] },
  lastname: { type: String, required: [true, "please enter your lasttname"] },
  email: { type: String, required: [true, "please enter your email"] },
  password: { type: String, required: [true, "please enter your  password"] }
});

let User = mongoose.model("user", UserSchema);

module.exports = User;
