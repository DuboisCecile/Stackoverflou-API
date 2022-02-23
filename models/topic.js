const mongoose = require("mongoose");

const topicSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  creationDate: { type: Date, required: true },
});

// id, title, description, user_id, creationDate
module.exports = mongoose.model("Topic", topicSchema);
