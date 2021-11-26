const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName:{
    type: String
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  userImage: {
    type: String,
  },
  postArray: [{ type: mongoose.Schema.ObjectId, ref: "memory" }]
});

module.exports = mongoose.model("user", userSchema);