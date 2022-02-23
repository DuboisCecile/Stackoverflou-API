const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creationDate: { type: Date, required: true },
});

// id, firstname, lastname, nickname, email, password, creationDate
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
