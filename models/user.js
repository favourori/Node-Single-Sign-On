const mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
  firstName: { type: String, required: [true, "please enter your firstname"] },
  lastName: { type: String, required: [true, "please enter your lastname"] },
  email: { type: String, required: [true, "please enter your email"] },
  password: { type: String, required: [true, "please enter your  password"] }
});

let User = mongoose.model("user", UserSchema);

module.exports = User;
